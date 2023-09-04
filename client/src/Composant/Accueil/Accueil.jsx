import Start from '../../Icons/Start';
import AcceuilImage from '../../Image/dumbbell.png'; 
import "./Acceuil.css";
import { useNavigate } from 'react-router-dom';
function Accueil(){
    const navigate=useNavigate();
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                    <div className="alert alert-info d-flex align-items-center">
                        <span className="badge bg-dark py-2 mr-2 me-2">NEW</span>
                        <p className="mb-0">Hot Deals Await You!</p>
                    </div>
                    <h1 className="fw-bold">Empower Your Fitness Journey with FitTrackr 💪🏻.</h1>
                    <h4 className="text-center ">Achieve Your Fitness Goals with FitTrackr's Smart Tracking.</h4>
                    <button className="btn btn-dark py-2 px-4" onClick={()=>{navigate('/SignIn')}}>Get started<Start/></button>
                </div>
                <div className="col-lg-6 col-md-6 d-none d-sm-block">
                    <img src={AcceuilImage} width="500px" id="AccImg"/>
                </div>
            </div>
        </div>
    )
}
export default Accueil;