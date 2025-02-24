import NavBar from '../../components/NavBar'

const UserPanelLayout = ({children}) => {
  return (
    <>
        <NavBar />
        { children }
    </>
  )
}

export default UserPanelLayout