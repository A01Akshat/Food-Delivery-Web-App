import { useRouter } from "next/navigation";
import { useState } from "react";

const Userlogin=(props)=>{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router=useRouter()

    const login = async () => {
        console.log(email);
        try {
            let response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            if (data.success) {
                alert("DONE");
                const { result } = data;
                delete result.password;
                localStorage.setItem('user', JSON.stringify(result));
                if(props?.redirect?.order)
                {
                    router.push('/order')
                }
                else{
                router.push('/');
                }
            } else {
                console.error("Failed to Login:", data.error);
                alert("Failed to Login");
            }
        } catch (error) {
            console.error("Failed to Login:", error);
            alert("Failed to Login: " + error.message);
        }
    };
    
    return(
        <div>
             <div className="input-wrapper">
                <input type="text" className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" />
            </div>
            <div className="input-wrapper">
                <input type="password" className="input-field" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" />
            </div>
            
            <div className="input-wrapper">
                <button className="button" onClick={login}> Login</button>
            </div>
        </div>
    )
}

export default Userlogin