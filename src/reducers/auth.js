

const authReducer =(state = {authData: false}, action)=> {
	switch (action.type) {
		case 'AUTH':
			return { authData: true };
		case 'LOGOUT':
			return { authData: false };
		default:
				return state;
    }
}

export default authReducer;
