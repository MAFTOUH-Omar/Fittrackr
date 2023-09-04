import "./QSN.css";
import Info from "../../Image/info.png";
function QSM(){
    return(
        <div className="bg-dark my-4 rounded-2">
            <div className="container">
                <div className="row">
                    <div className="col-3 mx-auto my-3">
                        <h2 className="fw-bold text-center bg-light rounded-2 py-2" id="h3QSM">Who are we ?</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="cadr my-5">
                        <div className="col-sm-12 col-12">
                            <h3 className="fw text-light">Get Know about us 🧐</h3>
                            <h5 className="text-light">Do you want to know how the FITTRACKER project was created</h5>
                            <ul className="text-light">
                                <li>Only professional traiers 💪🏻</li>
                                <li>Various types of workouts for all ages 🧘🏻‍♂️</li>
                                <li>Training in any conutry and at any time of the year 🌍</li>
                                <li>Gifts to all participants monthly ✨</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default QSM;