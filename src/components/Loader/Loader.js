import { Oval } from  'react-loader-spinner'
import styles from './styles.module.css'

const Loader = ( )=>{
    return (
    <>
    <div className={styles.container}>
        <Oval
            height = "60"
            width = "60"
            radius = "9"
            color = 'green'
            ariaLabel = 'three-dots-loading'     
            wrapperStyle={{
                position:"absolute",
                top:"50%",
                left:"50%",
                transform:"translate(-50%,-50%)"
            }}
            wrapperClass
        />
        </div>
      </>
      )
}

export default Loader
