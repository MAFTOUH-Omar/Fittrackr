import Logo from '../../Image/Fittrackr.png';
import Fit from '../../Image/fitness_tracker.png';
import "./Auth.css";
import In from '../../Icons/In';
import Google from '../../Image/Google.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
function SignIn(){
    const navigate = useNavigate();
    const [email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const getEmail = (e) =>{
        SetEmail(e.target.value);
    }
    const getPassWord = (p) =>{
        SetPassword(p.target.value);
    }
    const [Err,SetErr]=useState();
    const handleSignIn = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3030/auth/signin',
            {
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
    
          // Vérifiez si la réponse contient un token
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
                            <h3>Sign in to your account</h3>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label>Email address</label>
                            <input type="email" className='border border-info form-control' value={email} onChange={getEmail} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <label>Password</label>
                            <input type="password" className='border border-info form-control' value={password} onChange={getPassWord} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <button className='btn btn-info form-control text-light' onClick={handleSignIn}>Sign In<In/></button>
                        </div>
                    </div>
                    <div className="row mt-1 text-center">
                        <div className="col">
                            <h6>Not a member? <button onClick={()=>{navigate('/SignUp')}} className='badge bg-info text-light py-2 px-3 border-dark'>SignUp</button></h6>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <h6 className='text-center'>Or continue with</h6>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <button className='btn btn-light border-dark fw-bold form-control py-2'>
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
export default SignIn;