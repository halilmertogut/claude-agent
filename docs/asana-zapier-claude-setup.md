# Asana → Zapier → Claude Code Otonom Pipeline

## Mimari

```
Asana (etiket) → Zapier (Zap #1) → GitHub Issue → Claude Code Action → PR
                  Zapier (Zap #2) ← GitHub PR created → Asana task update
```

## Ön Koşullar

- GitHub repo (public veya private)
- Anthropic API key (`ANTHROPIC_API_KEY`)
- Zapier hesabı (Pro plan — multi-step zap gerekli)
- Asana hesabı

---

## Adım 1: GitHub Repo Hazırlığı

### 1.1 Secret Ekle

GitHub repo → Settings → Secrets and variables → Actions → New repository secret:

| Secret Name          | Value                    |
|---------------------|--------------------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` API anahtarın |

### 1.2 Label Oluştur

GitHub repo → Issues → Labels → "claude-task" adında yeni label oluştur.

### 1.3 Workflow Dosyası

`.github/workflows/claude-autonomous.yml` dosyası zaten bu repoda mevcut.
Bunu repo'na push et.

---

## Adım 2: Zapier Zap #1 — Asana → GitHub Issue

### Trigger: Asana

1. Zapier'da "Create a Zap" tıkla
2. Trigger app: **Asana**
3. Event: **"Tag Added to Task"**
   - Alternatif: "New Task in Project" (belirli bir project section için)
4. Asana hesabını bağla
5. Konfigürasyon:
   - **Workspace**: Senin workspace'in
   - **Tag**: "claude-auto" (Asana'da bu tag'i oluştur)

### Action: GitHub

1. Action app: **GitHub**
2. Event: **"Create Issue"**
3. GitHub hesabını bağla
4. Konfigürasyon:
   - **Repo**: claude-agent (veya hedef repo)
   - **Title**: `[Asana Auto] {{Task Name}}`
   - **Body**:
     ```
     ## Asana Task
     **Task**: {{Task Name}}
     **URL**: {{Task URL}}

     ## Description
     {{Task Notes}}

     ## Acceptance Criteria
     {{Task Notes}}

     ---
     _Otomatik oluşturuldu: Asana → Zapier → GitHub_
     ```
   - **Labels**: `claude-task`

Bu kadar! Label "claude-task" olduğu için GitHub Action otomatik tetiklenecek.

---

## Adım 3 (Opsiyonel): Zapier Zap #2 — PR → Asana Update

### Trigger: GitHub

1. Trigger app: **GitHub**
2. Event: **"New Pull Request"**
3. Filtre: PR body'de "Asana" kelimesi geçiyor

### Action: Asana

1. Action app: **Asana**
2. Event: **"Update Task"** veya **"Create Comment on Task"**
3. Konfigürasyon:
   - Asana task'ı Zapier'ın ilk zap'ından gelen task ID ile eşleştir
   - Comment: `Claude Code PR oluşturdu: {{PR URL}}`
   - Status: "In Review" olarak güncelle

---

## Adım 4: Test Et

1. Asana'da bir task oluştur, detaylı description yaz
2. Task'a "claude-auto" tag'ini ekle
3. Zapier tetiklenir → GitHub Issue oluşur
4. GitHub Action tetiklenir → Claude Code çalışır
5. Claude Code PR açar
6. (Opsiyonel) Zapier PR'ı yakalar → Asana'yı günceller

---

## Konfigürasyon Seçenekleri

### Model Seçimi

Workflow dosyasında `model` parametresi:
- `claude-sonnet-4-6` — Hızlı, maliyet-etkin (önerilen)
- `claude-opus-4-6` — Karmaşık tasklar için

### Timeout

- `timeout_minutes: 30` — Basit tasklar için yeterli
- Karmaşık implementasyonlar için 60'a çıkarılabilir

### İzin Verilen Araçlar

`allowed_tools` ile Claude'un hangi araçları kullanabileceğini kısıtla:
- `Bash,Read,Write,Edit,Glob,Grep` — Standart set
- Güvenlik için `Bash(git:*,npm:*,node:*)` gibi pattern ile kısıtlanabilir

### Budget Kontrolü

Workflow'a eklenebilir:
```yaml
max_budget_usd: 5  # Task başına maksimum harcama
```

---

## Güvenlik Notları

1. **API Key**: Sadece GitHub Secrets üzerinden, asla hardcode etme
2. **Allowed Tools**: Minimum gerekli araç setini ver
3. **Branch Protection**: main branch'e direct push'u engelle, sadece PR ile
4. **Issue Sanitization**: Workflow'da issue içeriği env var ile geçiriliyor (injection koruması)
5. **Budget Limit**: `max_budget_usd` ile maliyet kontrolü
6. **Timeout**: Sonsuz çalışmayı engeller
