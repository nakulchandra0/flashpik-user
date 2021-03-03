import { db } from '../config/db';

export const addItem = (dispute_id, user_id, created, name, profile, message, id) => {
    db.ref(`/dispute_chat/${dispute_id}`).push({
            'adminid': '',
            'created': created,
            'disputeid': dispute_id,
            'driverid': '', 
            'message': message,
            'profilename': name,
            'profilepic': profile,
            'userid': user_id,
            'user' : {
                '_id': 2,
                'name': name,
                'type': 'user'
            }
    })
}