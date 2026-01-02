import React from 'react';
import {
    BarChart3,
    RefreshCw,
    Calendar,
    FileText,
    ClipboardList,
    Receipt
} from 'lucide-react';


const FinanceOverview = () => {

    const statCards = [
        { value: '125', label: 'Active Workforce', color: 'blue' },
        { value: '₹12.5L', label: 'Current Month', color: 'green' },
        { value: '₹45.2L', label: 'In Selected Period', color: 'orange' },
        { value: '8', label: 'Awaiting Approval', color: 'yellow' },
    ];

    const quickActions = [
        { id: 'generate', label: 'Generate Payroll', icon: <RefreshCw size={20} /> },
        { id: 'export', label: 'Export Report', icon: <FileText size={20} /> },
        { id: 'reimbursements', label: 'View Reimbursements', icon: <ClipboardList size={20} /> },
        { id: 'tax', label: 'Tax Review', icon: <Receipt size={20} /> },
    ];

    const handleQuickAction = (id) => {
        console.log('Quick action:', id);
    };

    return (
        <div className="finance-overview-container">
            {/* Stat Cards */}
            <div className="stat-cards">
                {statCards.map((card, index) => (
                    <div key={index} className={`stat-card stat-${card.color}`}>
                        <h4>{card.value}</h4>
                        <p>{card.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="charts-row">
                <div className="chart-card">
                    <div className="chart-header">
                        <BarChart3 size={22} />
                        <h3>Salary Distribution</h3>
                    </div>
                    <div className="chart-placeholder">
                        {/* Add your chart component here */}
                        <span>Bar Chart Area</span>
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-header">
                        <RefreshCw size={22} />
                        <h3>Payroll Status Distribution</h3>
                    </div>
                    <div className="pie-placeholder">
                        {/* Add your pie chart component here */}
                        <span>Pie Chart</span>
                    </div>
                </div>
            </div>

            {/* Monthly Payroll Trends */}
            <div className="chart-card full-chart">
                <div className="chart-header">
                    <Calendar size={22} />
                    <h3>Monthly Payroll Trends</h3>
                </div>
                <div className="chart-placeholder">
                    {/* Add your line chart component here */}
                    <span>Line Chart Area</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="quick-actions-grid">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            className="quick-action-btn"
                            onClick={() => handleQuickAction(action.id)}
                        >
                            {action.icon}
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinanceOverview;
