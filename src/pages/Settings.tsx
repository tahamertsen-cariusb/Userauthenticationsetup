import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner@2.0.3';
import { Key, Bell, Sliders, Globe, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [shopifyKey, setShopifyKey] = useState('sk_live_••••••••••••••••');
  const [openaiKey, setOpenaiKey] = useState('sk-proj-••••••••••••••••');
  const [slackWebhook, setSlackWebhook] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [minStock, setMinStock] = useState('10');
  const [minSeoScore, setMinSeoScore] = useState('60');

  const handleSaveApiKeys = () => {
    toast.success('API keys saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved');
  };

  const handleSaveThresholds = () => {
    toast.success('Threshold settings saved');
  };

  const handleTestShopify = () => {
    toast.success('Shopify connection successful!');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-gray-100 mb-2">{t('settings')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure your application preferences and integrations
        </p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        {/* API Keys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              {t('apiKeys')}
            </CardTitle>
            <CardDescription>
              Manage your API keys for external integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="shopify-key">{t('shopifyApiKey')}</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="shopify-key"
                  type="password"
                  value={shopifyKey}
                  onChange={(e) => setShopifyKey(e.target.value)}
                  placeholder="sk_live_..."
                />
                <Button variant="outline" onClick={handleTestShopify}>
                  Test
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="openai-key">{t('openaiApiKey')}</Label>
              <Input
                id="openai-key"
                type="password"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-proj-..."
                className="mt-2"
              />
            </div>

            <Button onClick={handleSaveApiKeys}>Save API Keys</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              {t('notifications')}
            </CardTitle>
            <CardDescription>
              Configure notification channels for alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="slack-webhook">{t('slackWebhook')}</Label>
              <Input
                id="slack-webhook"
                value={slackWebhook}
                onChange={(e) => setSlackWebhook(e.target.value)}
                placeholder="https://hooks.slack.com/services/..."
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>{t('emailNotifications')}</Label>
                <p className="text-gray-500 dark:text-gray-400">
                  Receive email alerts for important events
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
          </CardContent>
        </Card>

        {/* Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              {t('thresholds')}
            </CardTitle>
            <CardDescription>
              Set threshold values for automated alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="min-stock">{t('minStock')}</Label>
              <Input
                id="min-stock"
                type="number"
                value={minStock}
                onChange={(e) => setMinStock(e.target.value)}
                className="mt-2"
              />
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Alert when product stock falls below this value
              </p>
            </div>

            <div>
              <Label htmlFor="min-seo">{t('minSeoScore')}</Label>
              <Input
                id="min-seo"
                type="number"
                value={minSeoScore}
                onChange={(e) => setMinSeoScore(e.target.value)}
                className="mt-2"
              />
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Alert when SEO score is below this threshold
              </p>
            </div>

            <Button onClick={handleSaveThresholds}>Save Thresholds</Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of the application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>{t('theme')}</Label>
                <p className="text-gray-500 dark:text-gray-400">
                  {theme === 'light' ? t('lightMode') : t('darkMode')}
                </p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
                Toggle Theme
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t('language')}
                </Label>
                <p className="text-gray-500 dark:text-gray-400">
                  Interface language preference
                </p>
              </div>
              <Select value={language} onValueChange={(v) => setLanguage(v as 'tr' | 'en')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
