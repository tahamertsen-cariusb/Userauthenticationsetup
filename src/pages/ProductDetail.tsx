import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, RefreshCw, Save, CheckCircle, Upload } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct, aiLogs, addAILog } = useData();
  const { t } = useLanguage();
  const [activeLanguage, setActiveLanguage] = useState<'tr' | 'en'>('tr');
  const [isGenerating, setIsGenerating] = useState(false);

  const product = products.find((p) => p.id === id);
  
  if (!product) {
    return (
      <div className="p-8">
        <p>Product not found</p>
      </div>
    );
  }

  const productLogs = aiLogs.filter((log) => log.productId === product.id);

  const handleRegenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    const newSuggestion = `[AI Generated] ${activeLanguage === 'tr' 
      ? 'Bu ürün, en yüksek kaliteyi ve dayanıklılığı sağlamak için özenle tasarlanmıştır. Modern teknoloji ve şık tasarımın mükemmel birleşimi, kullanıcı deneyimini en üst seviyeye çıkarır.'
      : 'This product is carefully designed to ensure the highest quality and durability. The perfect combination of modern technology and elegant design elevates the user experience to the highest level.'
    }`;
    
    updateProduct(product.id, {
      aiSuggestions: {
        ...product.aiSuggestions,
        [activeLanguage]: newSuggestion,
      },
    });

    // Add log
    const newLog = {
      id: Date.now().toString(),
      productId: product.id,
      productName: product.name,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      model: 'GPT-4',
      prompt: `Generate SEO-optimized description for ${product.name} in ${activeLanguage}`,
      tokens: Math.floor(Math.random() * 400) + 200,
      language: activeLanguage,
      seoScore: Math.floor(Math.random() * 20) + 75,
    };
    addAILog(newLog);

    setIsGenerating(false);
    toast.success('AI description generated successfully!');
  };

  const handleSave = () => {
    const suggestion = product.aiSuggestions?.[activeLanguage];
    if (suggestion) {
      updateProduct(product.id, {
        descriptions: {
          ...product.descriptions,
          [activeLanguage]: suggestion,
        },
        lastUpdated: new Date().toISOString().slice(0, 10),
      });
      toast.success('Description saved successfully!');
    }
  };

  const handleApprove = () => {
    handleSave();
    updateProduct(product.id, {
      seoScore: Math.min(100, product.seoScore + 10),
    });
    toast.success('Description approved and SEO score updated!');
  };

  const handlePushToShopify = () => {
    toast.success('Product pushed to Shopify successfully!');
  };

  return (
    <div className="p-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/app/products')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Product Info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('productDetails')}</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-gray-900 dark:text-gray-100 mb-2">{product.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Price</p>
                  <p className="text-gray-900 dark:text-gray-100">${product.price}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Stock</p>
                  <p className="text-gray-900 dark:text-gray-100">{product.stock}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Category</p>
                  <p className="text-gray-900 dark:text-gray-100">{product.category}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">SEO Score</p>
                  <p className="text-gray-900 dark:text-gray-100">{product.seoScore}/100</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t('currentDescription')}</h3>
                <p className="text-gray-600 dark:text-gray-400 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {product.descriptions[activeLanguage]}
                </p>
              </div>

              <Button className="w-full" onClick={handlePushToShopify}>
                <Upload className="w-4 h-4 mr-2" />
                {t('pushToShopify')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - AI Editor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('aiSuggestion')}</CardTitle>
              <CardDescription>AI-generated optimized description</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeLanguage} onValueChange={(v) => setActiveLanguage(v as 'tr' | 'en')}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="tr">Türkçe</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tr" className="space-y-4">
                  <Textarea
                    value={product.aiSuggestions?.tr || ''}
                    onChange={(e) => {
                      updateProduct(product.id, {
                        aiSuggestions: {
                          ...product.aiSuggestions,
                          tr: e.target.value,
                        },
                      });
                    }}
                    rows={8}
                    placeholder="AI suggestion will appear here..."
                  />
                </TabsContent>

                <TabsContent value="en" className="space-y-4">
                  <Textarea
                    value={product.aiSuggestions?.en || ''}
                    onChange={(e) => {
                      updateProduct(product.id, {
                        aiSuggestions: {
                          ...product.aiSuggestions,
                          en: e.target.value,
                        },
                      });
                    }}
                    rows={8}
                    placeholder="AI suggestion will appear here..."
                  />
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="flex-1"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                  {t('regenerate')}
                </Button>
                <Button onClick={handleSave} variant="outline" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  {t('save')}
                </Button>
                <Button onClick={handleApprove} className="flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t('approve')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Logs */}
          <Card>
            <CardHeader>
              <CardTitle>{t('aiLog')}</CardTitle>
              <CardDescription>Generation history for this product</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productLogs.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No logs yet</p>
                ) : (
                  productLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <Badge>{log.model}</Badge>
                        <span className="text-gray-500 dark:text-gray-400">{log.date}</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{log.prompt}</p>
                      <div className="flex gap-4 text-gray-600 dark:text-gray-400">
                        <span>Language: {log.language.toUpperCase()}</span>
                        <span>Tokens: {log.tokens}</span>
                        <span>Score: {log.seoScore}/100</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}