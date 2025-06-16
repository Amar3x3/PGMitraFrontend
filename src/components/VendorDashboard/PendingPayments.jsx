import React, { useState, useEffect } from 'react';
import vendorService from '../../services/vendorService';
import './PendingPayments.css';
import { MdCheckCircle } from 'react-icons/md';

const PendingPayments = () => {
    const [pendingPayments, setPendingPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPendingPayments();
    }, []);

    const fetchPendingPayments = async () => {
        try {
            setLoading(true);
            const response = await vendorService.getPendingPayments();
            // Ensure we're setting an array
            setPendingPayments(Array.isArray(response) ? response : []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch pending payments');
            console.error('Error fetching pending payments:', err);
            setPendingPayments([]); // Reset to empty array on error
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMarkComplete = async (paymentId) => {
        try {
            await vendorService.completePayment(paymentId);
            // Refresh the list after marking as complete
            fetchPendingPayments();
        } catch (err) {
            setError('Failed to mark payment as complete');
            console.error('Error completing payment:', err);
        }
    };

    const filteredPayments = Array.isArray(pendingPayments) ? pendingPayments.filter(payment => 
        payment.tenantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.tenantId?.toString().includes(searchTerm)
    ) : [];

    if (loading) {
        return <div className="loading">Loading pending payments...</div>;
    }

    return (
        <div className="pending-payments-container">
            <h2>Pending Payments</h2>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by tenant name or ID..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="payments-table-container">
                <table className="payments-table">
                    <thead>
                        <tr>
                           
                            <th>Tenant Name</th>
                            <th>Amount</th>
                            <th>Due Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map(payment => (
                            <tr key={payment.id}>
                                <td>{payment.tenantName}</td>
                                <td>₹{payment.amount}</td>
                                <td>{new Date(payment.dueDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleMarkComplete(payment.id)}
                                        className="complete-button"
                                        disabled={payment.status === 'COMPLETE'}
                                    >
                                        <MdCheckCircle />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredPayments.length === 0 && (
                <div className="no-payments">
                    No pending payments found
                </div>
            )}
        </div>
    );
};

export default PendingPayments; 