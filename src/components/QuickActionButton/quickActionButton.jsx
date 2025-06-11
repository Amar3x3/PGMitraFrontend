import './quickActionButton.css';

const QuickActionButton = ({ icon, label, onClick }) => (
    <button className="quick-action-button" onClick={onClick}>
        <span className="quick-action-icon">{icon}</span> 
        <span className="quick-action-label">{label}</span>
    </button>
);

export default QuickActionButton;
