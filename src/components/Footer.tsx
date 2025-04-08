
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <p style={styles.text}>© {new Date().getFullYear()} Weather Advisor. All rights reserved.</p>
        </footer>
    );
};

export default Footer;

const styles = {
    footer: {
        display: "flex",
        justifyContent: "center",
        zIndex: 1200
    },
    text: {
        color: '#a78bfa',
        fontSize: 14,
        letterSpacing: 0.5,
    },
};
