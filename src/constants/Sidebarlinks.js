import add from '../images/icons8-create-64.png'
import search from '../images/icons8-search-48.png'
import profile from '../images/icons8-user-location-48.png'


const Sidebarlinks=[

{

    imageUrl:search,
    route:'/Search',
    label:'search'


},

{
imageUrl:profile,
route:'/dashboard',
label:'profile'

}

,

{
imageUrl:add,
route:'/add',
label:'create'

}




]

export default Sidebarlinks;