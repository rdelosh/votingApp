import React, {Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class SignInForm extends Component{

	handleFormSubmit({email,password}){
		console.log(email,password)
		this.props.signinUser({email:email,password:password,history:this.props.history})
	}

	render(){
	const renderInput = (field) =>
								  <div>
								    <input {...field.input} type={field.type} />
								    {field.meta.touched &&
								      field.meta.error &&
								      <span className="error">
								        {field.meta.error}
								      </span>}
								   </div>;

		const {handleSubmit} = this.props;


		    return (
		      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		        <label htmlFor="email">Email</label>
		        <Field name="email" component={renderInput} type="text" />
		 
		        <label htmlFor="password">Password</label>
		        <Field name="password" component={renderInput} type="text" />
		 
		        <button action="submit" className="btn btn-primary">
		          Sign in
		        </button>
		      </form>
		    );
	}
}

const form = reduxForm({form:'signin'})(SignInForm)

export default connect(null,actions)(form)

