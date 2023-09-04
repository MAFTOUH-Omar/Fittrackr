import Logo from '../../Image/Fittrackr.png';
import Fit from '../../Image/SignUp.png';
import "./Auth.css";
import In from '../../Icons/In';
import Google from '../../Image/Google.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function SignUp(){
    const navigate = useNavigate();
    const [email,SetEmail]=useState();
    const [password,SetPassword]=useState();
    const [fullName,SetFullName]=useState();
    const getPassWord = (p) =>{
        SetPassword(p.target.value);
    }
    const getEmail = (e) =>{
        SetEmail(e.target.value);
    }
    const getFullName = (f) =>{
        SetFullName(f.target.value);
    }
    const [Err,SetErr]=useState();
    const handleSignUp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:3030/auth/signup',
                {
                fullName: fullName,
                email: email,
                password: password,
                },
                {
                headers: {
                    Authorization: 'JWT Mft26100$$',
                    'Content-Type': 'application/json',
                },
                }
            );
            if (response.data.token) {
                // Stockez le token dans le localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('fullName', response.data.user.fullName);
                navigate('/')
                console.log('Connexion réussie ! Token stocké dans le localStorage.');
            } else {
                console.error('Aucun token trouvé dans la réponse.');
            }
            
            } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            SetErr('Erreur lors de la connexion');
            }
    };
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=145169299005-fhhhhkklgma5i7plsi22emffjv90k3l7.apps.googleusercontent.com&redirect_uri=http://localhost:3000/&response_type=code&scope=profile email`;
    return(
        <div className='container mt-5'>
            <div className="row mt-2">
                <div className="col-lg-6 col-sm-2">
                    <div className="row mt-2 text-center">
                        <div className="col">
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="row mt-2 text-center">
                        <div className="col">
                            <h3>Create your account</h3>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label>Full Name</label>
                            <input type="text" className='border border-info form-control' value={fullName} onChange={getFullName} required/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label>Email address</label>
                            <input type="email" className='border border-info form-control' value={email} onChange={getEmail} required/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label>Password</label>
                            <input type="password" className='border border-info form-control' value={password} onChange={getPassWord} required/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <button className='btn btn-dark form-control text-light' onClick={handleSignUp}>Sign Up<In/></button>
                        </div>
                    </div>
                    <div className="row mt-1 text-center">
                        <div className="col">
                            <h6>Already have an account? <button onClick={()=>{navigate('/SignIn')}} className='badge bg-dark text-light py-2 px-3 border-dark'>SignIn</button></h6>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <h6 className='text-center'>Or continue with</h6>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <button className='btn btn-light border-dark fw-bold form-control py-2' onClick={() => { window.location = String(googleAuthUrl); }}>
                                <img src={Google} width="30px" height="30px"/>
                                &nbsp;&nbsp;Google
                            </button>
                        </div>
                    </div>
                    {Err &&
                        <div className="row mt-1">
                            <div className="col">
                                <div className="alert alert-danger">{Err}</div>
                            </div>
                        </div>
                    }
                </div>
                <div className="col-6 d-none d-sm-block">
                    <img src={Fit} alt="err" width="600px" height="480px"/>
                </div>
            </div>
        </div>
    )
}
export default SignUp;