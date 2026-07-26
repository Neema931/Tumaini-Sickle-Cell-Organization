import { useState } from "react";
import "../components/TSCO.css";

function Donate() {

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        amount: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleDonate = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/donate`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        id: "TSCO-" + Date.now(),

                        amount: Number(formData.amount),

                        notification_id: "ed79fae5-523f-46f7-aed2-da190c459e84",

                        email: formData.email,

                        phone: formData.phone,

                        first_name: formData.first_name,

                        last_name: formData.last_name

                    })
                }
            );


            const data = await response.json();


            console.log(data);


            if(data.redirect_url){

                window.location.href = data.redirect_url;

            } else {

                alert("Unable to start payment. Please try again.");

            }


        } catch(error){

            console.error("Payment Error:", error);

            alert("Something went wrong. Please try again.");

        }

    };



    return (

        <div className="donate-page">


            <h1>Support Our Mission</h1>


            <p>
                Your contribution helps provide treatment, awareness,
                and support for sickle cell warriors.
            </p>



            <p>
                We are a dedicated initiative that aims to make a significant
                impact in the lives of individuals affected by sickle cell
                disease (SCD). Our organization was founded with a profound
                commitment to collaborate with medical agencies, accomplished
                medical professionals, research institutions, and other
                stakeholders.
            </p>



            <p>
                Sickle cell disease is a complex and challenging genetic
                disorder that affects countless lives worldwide. Our goal is
                to create a lasting positive impact by championing
                comprehensive care, awareness, research, and support for
                individuals and families affected by SCD.
            </p>



            <p>
                We invite you to join us in our mission to bring hope,
                relief, and progress to the SCD community. Your support will
                help us continue our initiatives and create a healthier future.
            </p>


            <p>
                Thank you.
            </p>



            {/* Donation Form */}

            <div className="donation-form">

                <h2>Make a Donation</h2>


                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                />


                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="amount"
                    placeholder="Amount (KES)"
                    value={formData.amount}
                    onChange={handleChange}
                />


                <button onClick={handleDonate}>
                    Proceed To Payment
                </button>


            </div>


        </div>

    );

}


export default Donate;