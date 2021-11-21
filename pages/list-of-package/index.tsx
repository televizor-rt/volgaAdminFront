import {useAppSelector} from "../../store/hooks/hooks";
import {packageSlice} from "../../store/reducers/packageReducer";
import {useEffect} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";

export default function Index() {


    const {packages} = useAppSelector(state => state.packageReducer);
    const {} = packageSlice.actions;
    const dispatch = useDispatch();
    const {getData} = packageSlice.actions;

    useEffect(()=>{
        axios.get("https://bfc9-188-243-159-197.ngrok.io").then(res=>{
            dispatch(getData(res.data))
        })

    }, [])

    const {} = packageSlice.actions;


    if(packages.length ===0){
        return <></>
    }
    return (<>
            <div className={`main`}>
            {packages.map((package, i) => (
                <div key={i}>
                    <div className={`list__background`}>
                        <div className={`list__container`}>
                            Станция <span
                            className={`list_name`}>{package.city} {package.name}</span>
                        </div>
                    </div>
                    <div className={`container`}>
                        <div className={`table`}>
                            <div className={`table__header`}>
                                <span className={`table__column table__packageSize`}>Размер посылки</span>
                                <span className={`table__column table__methodOfTransportation`}>Метод транспортировки</span>
                                <div className={`table__column table__sender`}>
                                    Отпрвитель
                                </div>
                                <div className={`table__column table__recipient`}>
                                    Получатель
                                </div>
                            </div>
                            <div className={`table__rows`}>
                                {package.packages.map(pack => (
                                    <div className={`table__row`}>
                                        <span className={`table__column table__packageSize`}>{pack.size}</span>
                                        <span
                                            className={`table__column table__methodOfTransportation`}>{pack.methodOfTransportation}</span>
                                        <div className={`table__column table__sender`}>
                                            {pack.sender.name}
                                        </div>
                                        <div className={`table__column table__recipient`}>
                                            {pack.recipient.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}