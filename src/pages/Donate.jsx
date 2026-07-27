import "../components/TSCO.css";
import donateImg from "../assets/donate.png";

function Donate() {
    return (
        <div className="donate-page">
            <h1>Support Our Mission</h1>

            <p style={{fontSize:"18px", lineHeight:"1.6", color:"black"}}>
                Your contribution helps provide treatment, awareness,
                and support for sickle cell warriors.
            </p>

            <p style={{fontSize:"18px", lineHeight:"1.6", color:"black"}}>
                We invite you to join us in our mission to bring hope,
                relief, and progress to the SCD community. Your support will
                help us continue our initiatives and create a healthier future.
            </p>

            {/* Full-width donate image */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '24px 0'}}>
                <img src={donateImg} alt="Donate" style={{width: '100%', maxWidth: 540, aspectRatio: '1080 / 1350', objectFit: 'cover', borderRadius: 12, display: 'block'}} />
            </div>

            {/* Card below content with CTA */}
            <div className="donation-card">
                <div className="donation-card-inner">
                    <p>Click the button below to proceed with your donation.</p>
                    <button className="donate-action-button" type="button" onClick={() => window.location.href = 'https://tinyurl.com/yjy7hhve'}>
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Donate;