# Asana → Zapier → Claude Code Otonom Pipeline

## Mimari

```
Asana (claude-auto tag)
  → Zapier
    → halilmertogut/claude-agent Issue (label: claude-task + fe/be)
      → Orchestrator workflow
        → repository_dispatch
          → Cathoven-AI/nexthub (FE) veya Cathoven-AI/cathoven (BE)
            → Claude Code çalışır → PR açar
              → Orchestrator issue'ya sonuç comment bırakır
```

## Ön Koşullar

- Cathoven-AI org'da admin/write erişim
- Zapier hesabı
- Asana hesabı

---

## Adım 1: GitHub Secrets (3 repo'ya da ekle)

### 1.1 OAuth Token oluştur

Ayrı bir terminalde:
```bash
claude setup-token
```

### 1.2 Secrets ekle

**halilmertogut/claude-agent** (orchestrator):
| Secret | Açıklama |
|--------|----------|
| `ORG_DISPATCH_TOKEN` | Org repo'larına dispatch gönderebilen PAT (classic, `repo` scope) |

**Cathoven-AI/nexthub** ve **Cathoven-AI/cathoven** (workers):
| Secret | Açıklama |
|--------|----------|
| `CLAUDE_CODE_OAUTH_TOKEN` | `claude setup-token` çıktısı |
| `ORG_DISPATCH_TOKEN` | Orchestrator'a geri comment atabilmek için aynı PAT |

### 1.3 Labels oluştur

**halilmertogut/claude-agent** repo'sunda:
- `claude-task` — Zapier'dan gelen task'ları tetikler
- `fe` — Frontend (nexthub) repo'suna yönlendirir
- `be` — Backend (cathoven) repo'suna yönlendirir

---

## Adım 2: Workflow dosyaları

### Orchestrator (bu repo — zaten mevcut)
`.github/workflows/claude-autonomous.yml`

### Workers (hedef repo'lara kopyala)
`worker-workflow-template.yml` dosyasını kopyala:
- `Cathoven-AI/nexthub/.github/workflows/claude-worker.yml`
- `Cathoven-AI/cathoven/.github/workflows/claude-worker.yml`

---

## Adım 3: Zapier Zap

### Trigger: Asana
- App: **Asana**
- Event: **Tag Added to Task**
- Tag: **claude-auto**

### Action: GitHub — Create Issue
- Repo: **halilmertogut/claude-agent**
- Title: `[Asana] {{Task Name}}`
- Body:
  ```
  ## Asana Task
  **URL**: {{Task URL}}

  ## Description
  {{Task Notes}}
  ```
- Labels: `claude-task,fe` veya `claude-task,be`

> Zapier'da label'ı dinamik yapmak için: Asana task'ta section/tag ile
> FE/BE ayrımı yapıp Zapier filter + paths kullanabilirsin.

---

## Adım 4: Test

1. Asana'da bir task oluştur, detaylı description yaz
2. Task'a `claude-auto` tag'i ekle
3. Zapier tetiklenir → claude-agent'ta Issue açılır
4. Orchestrator issue'daki `fe`/`be` label'a göre dispatch eder
5. Hedef repo'da Claude Code çalışır, PR açar
6. Sonuç orchestrator issue'ya comment olarak döner

---

## Güvenlik

1. **Secrets**: Sadece GitHub Secrets, asla hardcode
2. **PAT scope**: `repo` minimum — `admin:org` verme
3. **Branch protection**: main'e direct push kapalı
4. **Input sanitization**: Tüm workflow'larda env var kullanılıyor
5. **Model budget**: `claude_args` içinde `--max-turns 50` limiti
