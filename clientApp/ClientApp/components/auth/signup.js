import React, {Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import * as actions from '../../actions'
import {connect} from 'react-redux'

const renderInput = (field) =>
                                <div>
                                <input {...field.input} type={field.type} className={field.className}/>
                                {field.meta.touched &&
                                field.meta.error &&
                                <div className="alert alert-danger">
                                    {field.meta.error}
                                </div>}
                                </div>;

class Signup extends Component{
    renderAlert(){
        
        if(this.props.errorMessage){
            return(
            <div className="alert alert-danger">{this.props.errorMessage}</div>
            )
        }
    }
    handleFormSubmit({email,password,confirmationpassword}){
		
		this.props.signupUser({email:email,password:password,confirmationpassword:confirmationpassword,history:this.props.history})
	}


    render(){
        
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                
                <label htmlFor="email">Email</label>
                <Field className="form-control" name="email" component={renderInput} type="text" />
                
                
                <label htmlFor="password">Password</label>
                <Field className="form-control" name="password" component={renderInput} type="password" />
                
                <label htmlFor="confirmationpassword">Confirm password</label>
                <Field className="form-control" name="confirmationpassword" component={renderInput} type="password" />
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">
                Sign up
                </button>
            </form>
            );
        
    }
}
function validate(formProps){
    const errors = {}
    if(!formProps.email){
        errors.email='Please enter an email';
    }
    if(!formProps.password){
        errors.password='Please enter an password';
    }
    if(!formProps.confirmationpassword){
        errors.confirmationpassword='Please enter an confirmationpassword';
    }

    if(formProps.password!==formProps.confirmationpassword){
        errors.password = 'Passwords must match'
    }
    return errors
}
function mapStateToProps(state){
	return {errorMessage:state.auth.error,currentstate:state.auth}
}

Signup = connect(
	mapStateToProps,
	actions)(Signup)
export default reduxForm({
    form:'signin',
    validate:validate
})(Signup)
