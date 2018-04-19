import React, {Component} from 'react'
import {reduxForm,Field} from 'redux-form'
import {connect} from 'react-redux'
import * as actions from '../../actions'

const renderInput = (field) =>
								  <div>
								    <input {...field.input} type={field.type} className={field.className}/>
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
					<div className="container">
						<h3>Please sign in to create a poll or view your polls</h3>
						<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
		        <label htmlFor="email">Email</label>
		        <Field className="form-control" name="email" component={renderInput} type="text" />
		 		
		        <label htmlFor="password">Password</label>
		        <Field className="form-control" name="password" component={renderInput} type="text" />
					 		{this.renderAlert()}
		        <button action="submit" className="btn btn-primary">
		          Sign in
		        </button>
		      </form>

					</div>
		      
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


