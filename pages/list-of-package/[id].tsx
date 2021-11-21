import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useAppSelector} from "../../store/hooks/hooks";
import {packageSlice} from "../../store/reducers/packageReducer";
import axios from "axios";
import {useDispatch} from "react-redux";

export default function Id () {
    const route = useRouter();

    const [valueSearch, setSearchValue] = useState();
    const dispatch = useDispatch();
    const {getData} = packageSlice.actions;
    useEffect(()=>{
        axios.get("http://localhost:8080").then(res=>{
            dispatch(getData(res.data))
        })

    }, [])
    useEffect(()=>{
        if(route.query) {
            console.log(route.query.id)
        }
    }, [])



    const {packages} = useAppSelector(state => state.packageReducer);
    const {} = packageSlice.actions;


    if(packages.length ===0){
        return <></>
    }

    return <div className={`main`}>
        <div className={`list__background`}>
            <div className={`list__container`}>
                Станция <span className={`list_name`}>{packages[Number(route.query.id)]?.city} {packages[Number(route.query.id)].name}</span>
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
                    {packages[Number(route.query.id)].packages.map(pack=>(
                        <div className={`table__row`}>
                            <span className={`table__column table__packageSize`}>{pack.size}</span>
                            <span className={`table__column table__methodOfTransportation`}>{pack.methodOfTransportation}</span>
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
}