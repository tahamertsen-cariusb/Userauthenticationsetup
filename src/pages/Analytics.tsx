import { useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Package, Star, FileText } from 'lucide-react';

export default function Analytics() {
  const { products, aiLogs } = useData();
  const { t } = useLanguage();

  const stats = useMemo(() => {
    const optimizedCount = products.filter((p) => p.seoScore >= 70).length;
    const avgSeoScore =
      products.reduce((sum, p) => sum + p.seoScore, 0) / products.length;
    const avgWords = 42; // Mock value
    
    return {
      optimizedCount,
      avgSeoScore: Math.round(avgSeoScore),
      avgWords,
      totalProducts: products.length,
    };
  }, [products]);

  // Daily production data
  const dailyData = useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().slice(5, 10);
    });

    return last7Days.map((date) => ({
      date,
      count: Math.floor(Math.random() * 15) + 5,
    }));
  }, []);

  // Model usage data
  const modelData = useMemo(() => {
    const models = aiLogs.reduce((acc, log) => {
      acc[log.model] = (acc[log.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(models).map(([name, value]) => ({
      name,
      value,
    }));
  }, [aiLogs]);

  // Language distribution
  const languageData = useMemo(() => {
    const langs = aiLogs.reduce((acc, log) => {
      acc[log.language] = (acc[log.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(langs).map(([name, value]) => ({
      name: name.toUpperCase(),
      value,
    }));
  }, [aiLogs]);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-gray-900 dark:text-gray-100 mb-2">{t('analyticsLogs')}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track AI optimization performance and usage statistics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600 dark:text-gray-400">
              {t('optimizedProducts')}
            </CardTitle>
            <Package className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 dark:text-gray-100">{stats.optimizedCount}</div>
            <p className="text-gray-500 dark:text-gray-400">
              out of {stats.totalProducts} products
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600 dark:text-gray-400">
              {t('avgSeoScore')}
            </CardTitle>
            <Star className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 dark:text-gray-100">{stats.avgSeoScore}/100</div>
            <p className="text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +5% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600 dark:text-gray-400">
              {t('avgWords')}
            </CardTitle>
            <FileText className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 dark:text-gray-100">{stats.avgWords}</div>
            <p className="text-gray-500 dark:text-gray-400">
              per description
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600 dark:text-gray-400">
              Total Generations
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 dark:text-gray-100">{aiLogs.length}</div>
            <p className="text-gray-500 dark:text-gray-400">
              AI descriptions created
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('dailyProduction')}</CardTitle>
            <CardDescription>AI descriptions generated per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('modelUsage')}</CardTitle>
            <CardDescription>Distribution by AI model</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={modelData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {modelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Language Distribution */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Language Distribution</CardTitle>
          <CardDescription>Descriptions by language</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={languageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentLogs')}</CardTitle>
          <CardDescription>Latest AI generation activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>{t('date')}</TableHead>
                <TableHead>{t('model')}</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>{t('tokens')}</TableHead>
                <TableHead>{t('seoScore')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aiLogs.slice(0, 10).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.productName}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>
                    <Badge>{log.model}</Badge>
                  </TableCell>
                  <TableCell>{log.language.toUpperCase()}</TableCell>
                  <TableCell>{log.tokens}</TableCell>
                  <TableCell>{log.seoScore}/100</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
