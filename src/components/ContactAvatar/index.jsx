import {Avatar} from 'antd'
import {generateColor} from '@/helpers/utils.jsx'

const UserAvatar = ({contact}) => {
    return <Avatar style={{backgroundColor: generateColor(contact.first_name)}} size={64}
                   alt="Avatar">
        <div className="font-semibold text-xl">
            {contact?.first_name?.charAt(0)}{contact?.surname?.charAt(0)}
        </div>
    </Avatar>
}

export default UserAvatar