import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LanguageConfig {
  code: string;
  name: string;
  enabled: boolean;
  keywords: string[];
  autoTranslate: boolean;
}

export default function LanguageSettings() {
  const { t } = useLanguage();
  const [languages, setLanguages] = useState<LanguageConfig[]>([
    {
      code: 'tr',
      name: 'Türkçe',
      enabled: true,
      keywords: ['kaliteli', 'dayanıklı', 'modern', 'şık'],
      autoTranslate: true,
    },
    {
      code: 'en',
      name: 'English',
      enabled: true,
      keywords: ['quality', 'durable', 'modern', 'elegant'],
      autoTranslate: true,
    },
    {
      code: 'fr',
      name: 'Français',
      enabled: false,
      keywords: ['qualité', 'durable', 'moderne', 'élégant'],
      autoTranslate: false,
    },
  ]);

  const [newKeyword, setNewKeyword] = useState<{ [key: string]: string }>({});

  const toggleLanguage = (code: string) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.code === code ? { ...lang, enabled: !lang.enabled } : lang
      )
    );
    toast.success('Language settings updated');
  };

  const toggleAutoTranslate = (code: string) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.code === code
          ? { ...lang, autoTranslate: !lang.autoTranslate }
          : lang
      )
    );
  };

  const addKeyword = (code: string) => {
    const keyword = newKeyword[code]?.trim();
    if (!keyword) return;

    setLanguages((prev) =>
      prev.map((lang) =>
        lang.code === code
          ? { ...lang, keywords: [...lang.keywords, keyword] }
          : lang
      )
    );
    setNewKeyword((prev) => ({ ...prev, [code]: '' }));
    toast.success('Keyword added');
  };

  const removeKeyword = (code: string, keyword: string) => {
    setLanguages((prev) =>
      prev.map((lang) =>
        lang.code === code
          ? { ...lang, keywords: lang.keywords.filter((k) => k !== keyword) }
          : lang
      )
    );
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-gray-100 mb-2">{t('languageSettings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure multi-language support and keywords for AI optimization
        </p>
      </div>

      <div className="grid gap-6">
        {languages.map((lang) => (
          <Card key={lang.code}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {lang.name}
                    <Badge variant={lang.enabled ? 'default' : 'secondary'}>
                      {lang.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{lang.code.toUpperCase()}</CardDescription>
                </div>
                <Switch
                  checked={lang.enabled}
                  onCheckedChange={() => toggleLanguage(lang.code)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Auto Translate */}
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t('autoTranslate')}</Label>
                  <p className="text-gray-500 dark:text-gray-400">
                    Automatically translate descriptions to this language
                  </p>
                </div>
                <Switch
                  checked={lang.autoTranslate}
                  onCheckedChange={() => toggleAutoTranslate(lang.code)}
                  disabled={!lang.enabled}
                />
              </div>

              {/* Keywords */}
              <div>
                <Label className="mb-2 block">{t('keywords')}</Label>
                <p className="text-gray-500 dark:text-gray-400 mb-3">
                  Keywords to focus on for SEO optimization
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {lang.keywords.map((keyword) => (
                    <Badge
                      key={keyword}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {keyword}
                      <button
                        onClick={() => removeKeyword(lang.code, keyword)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Add keyword..."
                    value={newKeyword[lang.code] || ''}
                    onChange={(e) =>
                      setNewKeyword((prev) => ({
                        ...prev,
                        [lang.code]: e.target.value,
                      }))
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addKeyword(lang.code);
                      }
                    }}
                    disabled={!lang.enabled}
                  />
                  <Button
                    onClick={() => addKeyword(lang.code)}
                    disabled={!lang.enabled}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
