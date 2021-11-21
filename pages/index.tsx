import {useEffect, useState} from "react";

import ball from "/public/ball.jpg"
import {useAppSelector} from "../store/hooks/hooks";
import {packageSlice} from "../store/reducers/packageReducer";
import {useDispatch} from "react-redux";
import axios from "axios";

export default function Home() {


  const [valueSearch, setSearchValue] = useState();
  const dispatch = useDispatch();
    const {packages} = useAppSelector(state => state.packageReducer);
    const {getData} = packageSlice.actions;

    useEffect(()=>{
        axios.get("https://bfc9-188-243-159-197.ngrok.io").then(res=>{
            dispatch(getData(res.data))
        })

    }, [])

    useEffect(()=>{
        if(packages.length > 0) {


            ymaps.ready(function () {
                const myMap = new ymaps.Map('map', {
                        center: [59.907411, 30.298797],
                        zoom: 9,
                        behaviors: ['default', 'scrollZoom']
                    }, {
                        searchControlProvider: 'yandex#search'
                    }),
                    /**
                     * Создадим кластеризатор, вызвав функцию-конструктор.
                     * Список всех опций доступен в документации.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#constructor-summary
                     */
                    clusterer = new ymaps.Clusterer({
                        /**
                         * Через кластеризатор можно указать только стили кластеров,
                         * стили для меток нужно назначать каждой метке отдельно.
                         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
                         */
                        preset: 'islands#invertedVioletClusterIcons',
                        /**
                         * Ставим true, если хотим кластеризовать только точки с одинаковыми координатами.
                         */
                        groupByCoordinates: false,
                        /**
                         * Опции кластеров указываем в кластеризаторе с префиксом "cluster".
                         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
                         */
                        clusterDisableClickZoom: true,
                        clusterHideIconOnBalloonOpen: false,
                        geoObjectHideIconOnBalloonOpen: false
                    }),
                    /**
                     * Функция возвращает объект, содержащий данные метки.
                     * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
                     * Поле balloonContentBody - источник данных для контента балуна.
                     * Оба поля поддерживают HTML-разметку.
                     * Список полей данных, которые используют стандартные макеты содержимого иконки метки
                     * и балуна геообъектов, можно посмотреть в документации.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
                     */
                    getPointData = function (index, countPackage, name) {
                        return {
                            balloonContentHeader: `<font size=3><b><a target="_blank" href="https://yandex.ru">${name}</a></b></font>`,
                            balloonContentBody: `<div class="list">
                                             <a class="packageList" href="/list-of-package/${index}" >показать список посылок</a>
                                             <div class="packageCount">всего ${countPackage}</div>
                                            </div>`,
                        };
                    },
                    /**
                     * Функция возвращает объект, содержащий опции метки.
                     * Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
                     */
                    getPointOptions = function () {
                        return {
                            preset: 'islands#violetIcon'
                        };
                    },
                    // points = [
                    //     [59.907411, 30.298797],
                    //     [59.919906, 30.329185],
                    //     [59.931668, 30.441711],
                    //     [59.930146, 30.362059],
                    //     [59.955513, 30.356355],
                    // ],
                    geoObjects = [];

                /**
                 * Данные передаются вторым параметром в конструктор метки, опции - третьим.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
                 */

                for (let i = 0; i < packages.length; i++) {
                    geoObjects[i] = new ymaps.Placemark(packages[i].point, getPointData(i, packages[i].packages.length, packages[i].name), getPointOptions());
                }

                /**
                 * Можно менять опции кластеризатора после создания.
                 */
                clusterer.options.set({
                    gridSize: 80,
                    clusterDisableClickZoom: true
                });

                /**
                 * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
                 */
                const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
                )
                const trainData = {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/train.png',
                    iconImageSize: [48, 48],
                    iconImageOffset: [0, 0],
                    iconContentOffset: [15, 15],
                    iconContentLayout: MyIconContentLayout
                }
                const train1 = new ymaps.Placemark([59.905460, 30.297605], {
                    hintContent: 'поезд',

                }, trainData);
                const train2 = new ymaps.Placemark([59.928708, 30.362549], {
                    hintContent: 'поезд',

                }, trainData);

                clusterer.add(geoObjects);
                myMap.geoObjects.add(clusterer);
                myMap.geoObjects.add(train1);
                myMap.geoObjects.add(train2);


                /**
                 * Спозиционируем карту так, чтобы на ней были видны все объекты.
                 */

                myMap.setBounds(clusterer.getBounds(), {
                    checkZoomRange: true
                });
            });
        }


    }, [packages])



  return (
    <div className={`main`}>
        <div className={`search__nav`}>
            <div className={`search__filed`}>
                <a className={`search__buttonSearch`} href={'/list-of-package'}>Список посылок</a>
            </div>

        </div>
      <div id="map" style={{width: "100%", height: "100%"}}/>
    </div>
  )
}
