import React, { Component } from 'react'
import './step1.css'
import { ReactComponent as ReactLogo } from './Group_143.svg'
/* on doit installer ca : npm install react-facebook-login 
npm install react-google-login 

*/

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


const responseFacebook = (response) => {
    console.log('login result ', response);
}

const componentClicked = (data) => {
    console.warn(data);

}



const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};



class Step1 extends Component {
    state = { user: false }
    facebookResponse = (response) => { console.log(response); this.setState({ ...this.state, user: response }) }



    continue = e => {
        e.preventDefault();
        this.props.nextStep();
      };




    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null,
            formErrors: {
                email: "",
                password: ""
            }
        }
    }


    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state)) {
            console.log(`
          --SUBMITTING--
          
          Email: ${this.state.email}
          Password: ${this.state.password}
        `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };


    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "firstName":
                formErrors.firstName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "lastName":
                formErrors.lastName =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };




    render() {
        const { formErrors } = this.state;


        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <ReactLogo className="logo" />
                    <h2>Bienvenue sur MALIB!</h2>


                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="email">
                            {/*<label htmlFor="email">Email</label>*/}
                            <input
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="Email"
                                type="email"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 && (
                                <span className="errorMessage">{formErrors.email}</span>
                            )}
                        </div>
                        <div className="password">
                            {/*<label htmlFor="password" >Mot de passe</label>*/}
                            <input

                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="password"
                                type="password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}>
                            </input>

                        </div>
                        <div className="createAccount">
                            <button type="submit"
                            onClick={this.continue}
                            > Continuer</button>

                            <h5>ou</h5>





                        </div>
                        <div className="hh">
                            <FacebookLogin
                                appId="257743868817465"
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={componentClicked}
                                callback={responseFacebook}

                                textButton="Login with Facebook "
                                icon="fa-facebook"
                                //cssClass=" kep-login-facebook kep-login-facebook-[button-size]"
                            />
                        </div>
                        <GoogleLogin className="logindone"
                            clientId="652720772123"
                            buttonText="Login with Google"
                            // onSuccess={responseGoogle}
                            //onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                        <div className="createAccount">
                            <small>Vous etes déja membres? Connectez vous.</small>
                        </div>


                    </form>
                </div>
            </div>
        );
    }
}
export default Step1;