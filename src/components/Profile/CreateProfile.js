import React, {useState} from 'react';

const form = {
	firstName: '',
	lastName: '',
	age: 0,

}

const CreateProfile = () => {
	const [formData, setFormData] = useState(form);
};

export default CreateProfile;