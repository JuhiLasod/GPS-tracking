import React, { useState } from "react";

function Dashboard() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSendLoc = async () => {
        if (!navigator.geolocation) {
            setStatus("Couldn't access location");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                try {
                    const res = await fetch("https://gps-tracking-backend-hkh1.onrender.com/api/sendlocation", {
                        // const res = await fetch("http://localhost:8000/api/sendlocation", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, location })
                    });
                    const text = await res.text();
                    setStatus("✅ Successfully sent location!");
                } catch (err) {
                    setStatus("❌ Failed to send location.");
                }
            },
            (error) => {
                setStatus("❌ Permission denied or error fetching location.");
                console.error("Geolocation error:", error);
            }
        );
    };

    const containerStyle = {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0f7fa, #e1bee7)',
        fontFamily: '"Poppins", sans-serif'
    };

    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        padding: '40px',
        width: '350px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)'
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        marginTop: '15px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none'
    };

    const buttonStyle = {
        marginTop: '25px',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '25px',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        cursor: 'pointer',
        transition: '0.3s ease'
    };

    const statusStyle = {
        marginTop: '20px',
        fontSize: '15px',
        color: status.includes('✅') ? '#2e7d32' : '#c62828'
    };

    const headingStyle = {
        fontSize: '22px',
        fontWeight: '600',
        color: '#333'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headingStyle}>📍 Send Your Current Location</div>
                <input
                    type="email"
                    placeholder="Enter recipient email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
                <button
                    onClick={handleSendLoc}
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                    onMouseOut={(e) => (e.target.style.opacity = 1)}
                >
                    Send Location
                </button>
                <div style={statusStyle}>{status}</div>
            </div>
        </div>
    );
}

export default Dashboard;
