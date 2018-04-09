import React, {Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const renderInput = (field) =>
								  <div>
								    <input {...field.input} type={field.type} />
								    {field.meta.touched &&
								      field.meta.error &&
								      <span className="error">
								        {field.meta.error}
								      </span>}
									 </div>;
									 

class SignInForm extends Component{

	handleFormSubmit({email,password}){
		console.log(email,password)
		this.props.signinUser({email:email,password:password,history:this.props.history})
	}
	renderAlert(){
		
		if(this.props.errorMessage){
			return(
				<div className="alert alert-danger">
					{this.props.errorMessage}
					
				</div>
				)
		}
	}


	render(){
	

		const {handleSubmit} = this.props;


		    return (
		      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		        <label htmlFor="email">Email</label>
		        <Field name="email" component={renderInput} type="text" />
		 		
		        <label htmlFor="password">Password</label>
		        <Field name="password" component={renderInput} type="text" />
		 		{this.renderAlert()}
		        <button action="submit" className="btn btn-primary">
		          Sign in
		        </button>
		      </form>
		    );
	}


	
}
function mapStateToProps(state){
	return {errorMessage:state.auth.error,currentstate:state.auth}
}

SignInForm = connect(
	mapStateToProps,
	actions)(SignInForm)
export default reduxForm({
	form:'signin'
})(SignInForm)


// const form = reduxForm({form:'signin'})(SignInForm)

// export default connect(mapStateToProps,actions)(form)


