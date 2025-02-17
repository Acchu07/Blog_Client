import styles from '../css/homepage.module.css';

export default function DisplayButton({children, setDisplayView , displayView}){
    
    function updateDisplayState(){

        switch(children){
            case 'Login': 
            displayView === 1 ? setDisplayView(0) : setDisplayView(1)
            break;

            case 'Sign Up': 
            displayView === 2 ? setDisplayView(0):setDisplayView(2)
            break;
        }

    }
    return <button className={styles.button} onClick={updateDisplayState}>{children}</button>
}