import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import {
  LayoutDashboard, Users, TrendingUp, DollarSign, Briefcase,
  Bell, Search, Menu, MoreHorizontal,
  Activity, Calendar, Wallet, CreditCard, PieChart as PieChartIcon,
  CheckCircle2, AlertCircle, Info
} from 'lucide-react';

// --- Dark Mode Palette Mock Data ---
const baseRevenueData = {
  'This Year': [
    { month: 'Jan', revenue: 400, target: 350 },
    { month: 'Feb', revenue: 300, target: 320 },
    { month: 'Mar', revenue: 200, target: 250 },
    { month: 'Apr', revenue: 275, target: 260 },
    { month: 'May', revenue: 190, target: 200 },
    { month: 'Jun', revenue: 240, target: 220 },
  ],
  'Last Year': [
    { month: 'Jan', revenue: 320, target: 300 },
    { month: 'Feb', revenue: 280, target: 290 },
    { month: 'Mar', revenue: 180, target: 200 },
    { month: 'Apr', revenue: 220, target: 240 },
    { month: 'May', revenue: 150, target: 180 },
    { month: 'Jun', revenue: 200, target: 190 },
  ],
  'This Quarter': [
    { month: 'Apr', revenue: 275, target: 260 },
    { month: 'May', revenue: 190, target: 200 },
    { month: 'Jun', revenue: 240, target: 220 },
  ],
  'This Month': [
    { month: 'Wk 1', revenue: 60, target: 55 },
    { month: 'Wk 2', revenue: 70, target: 65 },
    { month: 'Wk 3', revenue: 50, target: 50 },
    { month: 'Wk 4', revenue: 60, target: 50 },
  ]
};

const baseCustomerGrowthData = {
  'This Year': [
    { month: 'Jan', new: 400, churned: 80 },
    { month: 'Feb', new: 300, churned: 60 },
    { month: 'Mar', new: 200, churned: 50 },
    { month: 'Apr', new: 275, churned: 70 },
    { month: 'May', new: 190, churned: 40 },
    { month: 'Jun', new: 240, churned: 55 },
  ],
  'Last Year': [
    { month: 'Jan', new: 300, churned: 70 },
    { month: 'Feb', new: 250, churned: 55 },
    { month: 'Mar', new: 150, churned: 40 },
    { month: 'Apr', new: 200, churned: 60 },
    { month: 'May', new: 120, churned: 35 },
    { month: 'Jun', new: 180, churned: 45 },
  ],
  'This Quarter': [
    { month: 'Apr', new: 275, churned: 70 },
    { month: 'May', new: 190, churned: 40 },
    { month: 'Jun', new: 240, churned: 55 },
  ],
  'This Month': [
    { month: 'Wk 1', new: 65, churned: 15 },
    { month: 'Wk 2', new: 80, churned: 12 },
    { month: 'Wk 3', new: 55, churned: 10 },
    { month: 'Wk 4', new: 40, churned: 18 },
  ]
};

const kpiData = {
  'This Year': {
    revenue: { value: "$125.4K", change: "+12.5%", trend: "up" },
    customers: { value: "1,248", change: "+5.2%", trend: "up" },
    growth: { value: "23.8%", change: "+8.1%", trend: "up" },
    activeUsers: { value: "542", change: "+3.7%", trend: "up" }
  },
  'Last Year': {
    revenue: { value: "$102.1K", change: "+8.4%", trend: "up" },
    customers: { value: "982", change: "+4.1%", trend: "up" },
    growth: { value: "18.2%", change: "+5.3%", trend: "up" },
    activeUsers: { value: "410", change: "+2.1%", trend: "up" }
  },
  'This Quarter': {
    revenue: { value: "$48.6K", change: "+15.2%", trend: "up" },
    customers: { value: "480", change: "+6.8%", trend: "up" },
    growth: { value: "25.1%", change: "+9.2%", trend: "up" },
    activeUsers: { value: "520", change: "+4.2%", trend: "up" }
  },
  'This Month': {
    revenue: { value: "$15.8K", change: "+3.1%", trend: "up" },
    customers: { value: "142", change: "+1.8%", trend: "up" },
    growth: { value: "22.5%", change: "+4.4%", trend: "up" },
    activeUsers: { value: "542", change: "+0.8%", trend: "up" }
  }
};

const initialNotifications = [
  { id: 1, title: 'Server sync successful', time: '12 mins ago', type: 'info', read: false },
  { id: 2, title: 'Growth milestone achieved!', time: '1 hour ago', type: 'success', read: false },
  { id: 3, title: 'Unusual customer churn alert', time: '5 hours ago', type: 'warning', read: false },
];

const conversionData = [
  { name: 'Organic Search', value: 45 },
  { name: 'Paid Ads', value: 25 },
  { name: 'Social Media', value: 15 },
  { name: 'Referral', value: 10 },
  { name: 'Email', value: 5 },
];

const employeeData = [
  { id: 1, name: 'Sarah Jenkins', role: 'Senior Account Exec', sales: 145000, deals: 42, performance: 'Excellent' },
  { id: 2, name: 'Marcus Chen', role: 'Account Executive', sales: 112000, deals: 28, performance: 'Good' },
  { id: 3, name: 'Priya Patel', role: 'Sales Development', sales: 89000, deals: 65, performance: 'Excellent' },
  { id: 4, name: 'James Wilson', role: 'Account Executive', sales: 74000, deals: 19, performance: 'Needs Improvement' },
  { id: 5, name: 'Elena Rodriguez', role: 'Regional Manager', sales: 210000, deals: 14, performance: 'Outstanding' },
];

const COLORS = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'];

const baseFinancialData = {
  'This Year': [
    { month: 'Jan', revenue: 400, expenses: 280, profit: 120 },
    { month: 'Feb', revenue: 300, expenses: 210, profit: 90 },
    { month: 'Mar', revenue: 200, expenses: 140, profit: 60 },
    { month: 'Apr', revenue: 275, expenses: 190, profit: 85 },
    { month: 'May', revenue: 190, expenses: 130, profit: 60 },
    { month: 'Jun', revenue: 240, expenses: 160, profit: 80 },
  ],
  'Last Year': [
    { month: 'Jan', revenue: 320, expenses: 220, profit: 100 },
    { month: 'Feb', revenue: 280, expenses: 190, profit: 90 },
    { month: 'Mar', revenue: 180, expenses: 130, profit: 50 },
    { month: 'Apr', revenue: 220, expenses: 150, profit: 70 },
    { month: 'May', revenue: 150, expenses: 110, profit: 40 },
    { month: 'Jun', revenue: 200, expenses: 140, profit: 60 },
  ],
  'This Quarter': [
    { month: 'Apr', revenue: 275, expenses: 190, profit: 85 },
    { month: 'May', revenue: 190, expenses: 130, profit: 60 },
    { month: 'Jun', revenue: 240, expenses: 160, profit: 80 },
  ],
  'This Month': [
    { month: 'Wk 1', revenue: 60, expenses: 40, profit: 20 },
    { month: 'Wk 2', revenue: 70, expenses: 45, profit: 25 },
    { month: 'Wk 3', revenue: 50, expenses: 35, profit: 15 },
    { month: 'Wk 4', revenue: 60, expenses: 40, profit: 20 },
  ]
};

const financialKPIs = {
  'This Year': {
    profit: { value: "$164K", change: "18.5%", trend: "up" },
    expenses: { value: "$258K", change: "4.2%", trend: "down" },
    margin: { value: "38.8%", change: "2.1%", trend: "up" }
  },
  'Last Year': {
    profit: { value: "$111K", change: "12.4%", trend: "up" },
    expenses: { value: "$243K", change: "5.1%", trend: "up" },
    margin: { value: "31.3%", change: "1.5%", trend: "up" }
  },
  'This Quarter': {
    profit: { value: "$93K", change: "22.1%", trend: "up" },
    expenses: { value: "$123K", change: "8.5%", trend: "down" },
    margin: { value: "43.0%", change: "4.5%", trend: "up" }
  },
  'This Month': {
    profit: { value: "$30K", change: "15.2%", trend: "up" },
    expenses: { value: "$52K", change: "2.4%", trend: "down" },
    margin: { value: "36.5%", change: "1.2%", trend: "up" }
  }
};

const customerDemographicsData = {
  'This Year': [
    { name: '18-24', value: 15 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45-54', value: 15 },
    { name: '55+', value: 10 },
  ],
  'Last Year': [
    { name: '18-24', value: 12 },
    { name: '25-34', value: 38 },
    { name: '35-44', value: 28 },
    { name: '45-54', value: 14 },
    { name: '55+', value: 8 },
  ],
  'This Quarter': [
    { name: '18-24', value: 18 },
    { name: '25-34', value: 32 },
    { name: '35-44', value: 22 },
    { name: '45-54', value: 18 },
    { name: '55+', value: 10 },
  ],
  'This Month': [
    { name: '18-24', value: 20 },
    { name: '25-34', value: 30 },
    { name: '35-44', value: 20 },
    { name: '45-54', value: 20 },
    { name: '55+', value: 10 },
  ]
};

const customerFeedbackData = {
  'This Year': [
    { id: 1, user: 'j.smith@example.com', comment: 'The dark interface looks amazing. So easy on the eyes.', rating: 'Positive' },
    { id: 2, user: 'a.jones@company.org', comment: 'Could we get a direct CSV exporter for the monthly tables?', rating: 'Neutral' },
    { id: 3, user: 'm.williams@startup.net', comment: 'Chart rendering speed is incredibly fast now.', rating: 'Positive' },
  ],
  'Last Year': [
    { id: 1, user: 't.taylor@techcorp.com', comment: 'Hoping for a UI refresh soon.', rating: 'Neutral' },
  ],
  'This Quarter': [
    { id: 1, user: 'k.white@designstudio.com', comment: 'Love the new performance graphs updated this quarter.', rating: 'Positive' },
  ],
  'This Month': [
     { id: 1, user: 'l.black@marketing.inc', comment: 'The timeframe selector is really smooth.', rating: 'Positive' },
  ]
};

const teamData = {
  'This Year': [
    { department: 'Sales', headCount: 12, budget: 150000, spent: 142000 },
    { department: 'Marketing', headCount: 8, budget: 120000, spent: 115000 },
    { department: 'Engineering', headCount: 24, budget: 350000, spent: 340000 },
    { department: 'Support', headCount: 15, budget: 90000, spent: 85000 },
    { department: 'HR', headCount: 4, budget: 60000, spent: 55000 },
  ],
  'Last Year': [
    { department: 'Sales', headCount: 10, budget: 130000, spent: 128000 },
    { department: 'Marketing', headCount: 7, budget: 100000, spent: 98000 },
    { department: 'Engineering', headCount: 20, budget: 300000, spent: 295000 },
    { department: 'Support', headCount: 12, budget: 80000, spent: 78000 },
    { department: 'HR', headCount: 3, budget: 50000, spent: 48000 },
  ],
  'This Quarter': [
    { department: 'Sales', headCount: 12, budget: 45000, spent: 41000 },
    { department: 'Marketing', headCount: 8, budget: 35000, spent: 31000 },
    { department: 'Engineering', headCount: 24, budget: 90000, spent: 88000 },
    { department: 'Support', headCount: 15, budget: 25000, spent: 22000 },
    { department: 'HR', headCount: 4, budget: 15000, spent: 13500 },
  ],
  'This Month': [
    { department: 'Sales', headCount: 12, budget: 15000, spent: 14500 },
    { department: 'Marketing', headCount: 8, budget: 12000, spent: 10800 },
    { department: 'Engineering', headCount: 24, budget: 30000, spent: 29500 },
    { department: 'Support', headCount: 15, budget: 8000, spent: 7500 },
    { department: 'HR', headCount: 4, budget: 5000, spent: 4500 },
  ]
};

// --- Custom Reusable Components ---
const Card = ({ children, className = '' }) => (
  <div className={`bg-[#151D30]/60 backdrop-blur-md rounded-xl border border-slate-800/80 shadow-lg ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    primary: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  );
};

const KPIWidget = ({ title, value, change, trend, icon: Icon }) => (
  <Card className="p-6 transition-all duration-300 hover:translate-y-[-2px] hover:border-slate-700">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <div className="p-2.5 bg-[#1E293B] rounded-lg text-blue-500 shadow-inner">
        <Icon size={18} />
      </div>
    </div>
    <div className="flex items-baseline space-x-2">
      <h2 className="text-3xl font-semibold text-white tracking-tight">{value}</h2>
    </div>
    <div className="mt-3 flex items-center text-xs">
      <span className={`flex items-center font-semibold ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
        {change}
      </span>
      <span className="text-slate-500 ml-2">MoM change</span>
    </div>
  </Card>
);

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('business-kpi');
  const [timeframe, setTimeframe] = useState('This Year');
  const [isTimeframeDropdownOpen, setIsTimeframeDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const performSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const results = [];

    employeeData.forEach(emp => {
      if (emp.name.toLowerCase().includes(q) || emp.role.toLowerCase().includes(q)) {
        results.push({
          type: 'employee',
          title: emp.name,
          subtitle: emp.role,
          data: emp
        });
      }
    });

    teamData[timeframe].forEach(dept => {
      if (dept.department.toLowerCase().includes(q)) {
        results.push({
          type: 'department',
          title: dept.department,
          subtitle: `Headcount: ${dept.headCount} | Budget: $${dept.budget.toLocaleString()}`,
          data: dept
        });
      }
    });

    customerFeedbackData[timeframe].forEach(feedback => {
      if (feedback.user.toLowerCase().includes(q) || feedback.comment.toLowerCase().includes(q)) {
        results.push({
          type: 'feedback',
          title: feedback.user,
          subtitle: feedback.comment.substring(0, 50) + (feedback.comment.length > 50 ? '...' : ''),
          data: feedback
        });
      }
    });

    setSearchResults(results);
    setIsSearchOpen(results.length > 0);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen && unreadCount > 0) {
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  const currentKPIs = kpiData[timeframe];
  const currentRevenueData = baseRevenueData[timeframe];
  const currentCustomerData = baseCustomerGrowthData[timeframe];
  const currentFinancialKPIs = financialKPIs[timeframe];
  const currentFinancialChartData = baseFinancialData[timeframe];
  const currentCustomerDemographics = customerDemographicsData[timeframe];
  const currentCustomerFeedback = customerFeedbackData[timeframe];
  const currentTeamData = teamData[timeframe];

  // --- View: Executive / Business KPI ---
  const renderBusinessKPIView = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Metrics Pro</h1>
        <p className="text-slate-400 mt-1">Your comprehensive dashboard for business insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPIWidget
          title="Revenue"
          value={currentKPIs.revenue.value}
          change={currentKPIs.revenue.change}
          trend={currentKPIs.revenue.trend}
          icon={DollarSign}
        />
        <KPIWidget
          title="Customers"
          value={currentKPIs.customers.value}
          change={currentKPIs.customers.change}
          trend={currentKPIs.customers.trend}
          icon={Users}
        />
        <KPIWidget
          title="Growth"
          value={currentKPIs.growth.value}
          change={currentKPIs.growth.change}
          trend={currentKPIs.growth.trend}
          icon={TrendingUp}
        />
        <KPIWidget
          title="Active Users"
          value={currentKPIs.activeUsers.value}
          change={currentKPIs.activeUsers.change}
          trend={currentKPIs.activeUsers.trend}
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue Trend</h2>
              <p className="text-xs text-slate-500">Actual revenue vs targeted metrics ({timeframe})</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`$${value}k`, 'Revenue']}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Area type="monotone" name="Revenue" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Growth Analysis</h2>
              <p className="text-xs text-slate-500">New acquisition trends ({timeframe})</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentCustomerData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} />
                <RechartsTooltip
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Bar name="Growth" dataKey="new" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 flex flex-col">
          <div className="p-6 border-b border-slate-800/80 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-white">Employee Performance</h2>
              <p className="text-xs text-slate-500">Sales team monthly leaderboards</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/40">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Employee</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Total Sales</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Deals Closed</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Status</th>
                  <th className="px-6 py-4 border-b border-slate-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {employeeData.map((emp) => {
                   let badgeVariant = 'default';
                   if (emp.performance === 'Excellent' || emp.performance === 'Outstanding') badgeVariant = 'success';
                   if (emp.performance === 'Good') badgeVariant = 'primary';
                   if (emp.performance === 'Needs Improvement') badgeVariant = 'warning';

                   return (
                    <tr key={emp.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-200">{emp.name}</span>
                          <span className="text-xs text-slate-500">{emp.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-300">
                        ${emp.sales.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                        {emp.deals}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={badgeVariant}>{emp.performance}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-slate-500">
                        <button className="hover:text-slate-300 p-1 rounded-md hover:bg-slate-800 transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-1">Conversion Shares</h2>
          <p className="text-xs text-slate-500 mb-6">Traffic sources converting to sales</p>

          <div className="h-[220px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">4.6%</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Avg Rate</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {conversionData.map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full mr-2" style={{backgroundColor: COLORS[i]}}></span>
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="font-semibold text-slate-200">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );

  // --- View: Financials ---
  const renderFinancialsView = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Financial Overview</h1>
        <p className="text-slate-400 mt-1">Detailed profitability metrics and operational expenses ({timeframe})</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPIWidget
          title="Profit"
          value={currentFinancialKPIs.profit.value}
          change={currentFinancialKPIs.profit.change}
          trend={currentFinancialKPIs.profit.trend}
          icon={Wallet}
        />
        <KPIWidget
          title="Expenses"
          value={currentFinancialKPIs.expenses.value}
          change={currentFinancialKPIs.expenses.change}
          trend={currentFinancialKPIs.expenses.trend}
          icon={CreditCard}
        />
        <KPIWidget
          title="Operating Margin"
          value={currentFinancialKPIs.margin.value}
          change={currentFinancialKPIs.margin.change}
          trend={currentFinancialKPIs.margin.trend}
          icon={PieChartIcon}
        />
      </div>

      <Card className="p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Revenue vs Expenses</h2>
            <p className="text-xs text-slate-500">Direct comparison of operational costs against gross earnings ({timeframe})</p>
          </div>
        </div>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentFinancialChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} />
              <RechartsTooltip
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
              <Bar name="Revenue" dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar name="Expenses" dataKey="expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar name="Profit" dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );

  // --- View: Customers ---
  const renderCustomersView = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Customer Demographics</h1>
        <p className="text-slate-400 mt-1">Detailed active consumer segmentation and dynamic feedback matrix ({timeframe})</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Age Breakdowns</h2>
              <p className="text-xs text-slate-500">Demographics of currently active users</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentCustomerDemographics}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {currentCustomerDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Latest Feedback</h2>
              <p className="text-xs text-slate-500">Comments sourced from helpdesk tickets</p>
            </div>
          </div>
          <div className="space-y-4 h-[300px] overflow-y-auto pr-1">
             {currentCustomerFeedback.map(feedback => (
               <div key={feedback.id} className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-semibold text-slate-300">{feedback.user}</span>
                   <Badge variant={feedback.rating === 'Positive' ? 'success' : feedback.rating === 'Negative' ? 'danger' : 'default'}>
                     {feedback.rating}
                   </Badge>
                 </div>
                 <p className="text-xs text-slate-400 leading-relaxed">{feedback.comment}</p>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </>
  );

  // --- View: Team Performance ---
  const renderTeamView = () => (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Team Budget Analytics</h1>
        <p className="text-slate-400 mt-1">Departmental performance metrics and resource allocations ({timeframe})</p>
      </div>

      <Card className="flex flex-col mb-8">
        <div className="p-6 border-b border-slate-800/80">
          <h2 className="text-lg font-semibold text-white">Department Overview</h2>
          <p className="text-xs text-slate-500">Current quarter headcount and structural budget spent metrics</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/40">
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Headcount</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Allocated Budget</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Spent</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {currentTeamData.map((dept, idx) => {
                  const percentSpent = (dept.spent / dept.budget) * 100;
                  let statusVariant = 'success';
                  let statusText = 'On Track';
                  if (percentSpent > 95) { statusVariant = 'danger'; statusText = 'Over Budget'; }
                  else if (percentSpent > 85) { statusVariant = 'warning'; statusText = 'Nearing Limit'; }

                  return (
                  <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">
                      {dept.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      {dept.headCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-300">
                      ${dept.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>${dept.spent.toLocaleString()}</span>
                        <span>{percentSpent.toFixed(0)}%</span>
                      </div>
                      <div className="w-32 bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${statusVariant === 'danger' ? 'bg-rose-500' : statusVariant === 'warning' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ width: `${Math.min(percentSpent, 100)}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={statusVariant}>{statusText}</Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );

  return (
    <div className="flex h-screen bg-[#0B0F19] text-slate-200 font-sans antialiased overflow-hidden">

      {/* Sidebar */}
      <aside className={`bg-[#0F172A] border-r border-slate-900 w-64 flex-shrink-0 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-0' : '-ml-64'} md:ml-0 md:relative absolute z-20 h-full`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-900">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center mr-3 text-white shadow-lg">
            <Activity size={18} />
          </div>
          <span className="font-bold text-lg tracking-wide text-white">Metrics Pro</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Dashboards</p>

          <button
            onClick={() => setActiveTab('business-kpi')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg group transition-colors text-sm ${activeTab === 'business-kpi' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'}`}
          >
            <LayoutDashboard size={18} className="mr-3" />
            <span>Business KPI</span>
          </button>

          <button
            onClick={() => setActiveTab('financials')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg group transition-colors text-sm ${activeTab === 'financials' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'}`}
          >
            <DollarSign size={18} className="mr-3" />
            <span>Financials</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg group transition-colors text-sm ${activeTab === 'customers' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'}`}
          >
            <Users size={18} className="mr-3" />
            <span>Customers</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg group transition-colors text-sm ${activeTab === 'team' ? 'bg-blue-600/10 text-blue-400 font-medium' : 'hover:bg-slate-800/40 text-slate-400 hover:text-slate-200'}`}
          >
            <Briefcase size={18} className="mr-3" />
            <span>Team Performance</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-900 bg-[#0A0E1A]/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-semibold">
              JD
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Jane Doe</p>
              <p className="text-[10px] text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">

        {/* Ambient Background Glow */}
        <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        {/* Global Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-900 bg-[#0B0F19]/80 backdrop-blur-md z-10 flex-shrink-0">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="mr-4 text-slate-400 hover:text-white md:hidden">
              <Menu size={20} />
            </button>
            <div className="relative hidden sm:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search analytics..."
                value={searchQuery}
                onChange={(e) => performSearch(e.target.value)}
                onFocus={() => searchQuery && setIsSearchOpen(true)}
                className="w-full bg-[#151D30]/40 border border-slate-800/80 pl-9 pr-4 py-1.5 rounded-full text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
              />

              {isSearchOpen && searchResults.length > 0 && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchOpen(false)}></div>
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#0F172A] rounded-lg shadow-xl border border-slate-800 py-1 z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((result, idx) => (
                      <div key={idx} className="px-4 py-2.5 hover:bg-[#1E293B] transition-colors border-b border-slate-800/40 last:border-0 cursor-pointer">
                        <p className="text-xs font-semibold text-slate-200">{result.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{result.subtitle}</p>
                        <p className="text-[10px] text-slate-400 mt-1 capitalize">{result.type}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Functional Timeframe Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsTimeframeDropdownOpen(!isTimeframeDropdownOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center px-3 py-1.5 bg-[#151D30]/60 border border-slate-800/80 rounded-lg text-xs font-semibold text-slate-300 hover:bg-[#1E293B] transition-colors"
              >
                <Calendar size={14} className="mr-2 text-slate-400" />
                {timeframe}
              </button>

              {isTimeframeDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsTimeframeDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-40 bg-[#0F172A] rounded-lg shadow-xl border border-slate-800 py-1 z-50">
                    {['This Month', 'This Quarter', 'This Year', 'Last Year'].map((option) => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-2 text-xs hover:bg-[#1E293B] transition-colors ${timeframe === option ? 'text-blue-400 font-semibold bg-blue-500/5' : 'text-slate-400'}`}
                        onClick={() => {
                          setTimeframe(option);
                          setIsTimeframeDropdownOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Functional Notifications */}
            <div className="relative">
              <button
                onClick={handleNotificationClick}
                className={`relative p-2 rounded-full transition-colors ${isNotificationOpen ? 'bg-slate-800/40 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0B0F19]"></span>
                )}
              </button>

              {isNotificationOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-[#0F172A] rounded-lg shadow-xl border border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                      <h3 className="text-xs font-semibold text-white">Notifications</h3>
                      <button
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold"
                      >
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map(notification => (
                        <div key={notification.id} className={`px-4 py-2.5 border-b border-slate-800/40 last:border-0 hover:bg-[#1E293B]/40 transition-colors ${!notification.read ? 'bg-blue-500/5' : ''}`}>
                          <div className="flex gap-2 items-start">
                            <div className={`mt-0.5 p-1 rounded-full ${
                              notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                              notification.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-blue-500/10 text-blue-500'
                            }`}>
                              {notification.type === 'success' ? <CheckCircle2 size={12} /> :
                               notification.type === 'warning' ? <AlertCircle size={12} /> :
                               <Info size={12} />}
                            </div>
                            <div>
                              <p className={`text-xs ${!notification.read ? 'font-semibold text-slate-200' : 'text-slate-400'}`}>
                                {notification.title}
                              </p>
                              <p className="text-[9px] text-slate-500 mt-0.5">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Scrolling Canvas */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 z-0">
           {activeTab === 'business-kpi' && renderBusinessKPIView()}
           {activeTab === 'financials' && renderFinancialsView()}
           {activeTab === 'customers' && renderCustomersView()}
           {activeTab === 'team' && renderTeamView()}
        </div>
      </main>
    </div>
  );
}
