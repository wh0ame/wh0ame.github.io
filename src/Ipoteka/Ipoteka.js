import React, { useState } from "react";
import IpotekaCode from "./IpotekaCode";
import mouse from '../img/header/mouse.svg';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import './IpotekaStyle.css';
import SmallHeader from "../layouts/SmallHeader";

export default function Ipoteka(){
    const [creditValue, setCreditValue] = useState(12000000)
    const [vznosValue, setVznosValue] = useState(2500000)
    const [srokValue, setSrokValue] = useState(10)
    const [stavkaValue, setStavkaValue] = useState(3)
    function creditInput(creditInput) {
        setCreditValue(creditInput.target.value)
        if (vznosValue > creditInput.target.value) {
            setVznosValue(creditInput.target.value);
        }
    }

    function vznosInput(vznosInput) {
        setVznosValue(vznosInput.target.value)
    }

    function srokInput(srokInput) {
        setSrokValue(srokInput.target.value)
    }

    function stavkaInput(stavkaInput) {
        setStavkaValue(stavkaInput.target.value)
    }

    let StavkaIpotekaMonth = Math.round((creditValue - vznosValue) / stavkaValue / 12 / 100);
    let IpotekaMonth = Math.round((creditValue - vznosValue) * StavkaIpotekaMonth * stavkaValue / ( stavkaValue - 1 ))
    let Overprice = (IpotekaMonth * srokValue - (creditValue - vznosValue))
    let AllSum = (Overprice + (creditValue - vznosValue) )
    return(
        <>
            <SmallHeader />
            <div className="Atribut">
            <div className="container my-container font-sans">
            <div className="card_ipoteka p-10">
            <div className="card-header my-card-header">
                <h5 className="card-title text-center mb-5 font-black underline">Калькулятор ипотечного кредитования</h5>
            </div>
            <div className="card-body">
                <label htmlFor="creditText">Стоимость недвижимости:</label>
                <input
                    type="text"
                    id="creditText"
                    className="form-control"
                    aria-describedby="creditNumberHolder"
                    value={creditValue + " ₽"}
                />
                <input
                    type="range"
                    className="form-control-range"
                    id="creditRange"
                    min={0}
                    max={15000000}
                    value={creditValue}
                    onInput={creditInput}
                />
                <small id="creditNumberHolder" className="form-text text-muted p-3">
                Сумма, которую за вас заплатит банк.
                </small>
            </div>
            <div className="card-body">
                <label htmlFor="firstContributionText">Первоначальный взнос:</label>
                <input
                type="text"
                id="firstContributionText"
                className="form-control"
                aria-describedby="firstContributionNumberHolder"
                value={vznosValue + " ₽"}
                />
                <input
                type="range"
                className="form-control-range"
                id="firstContributionRange"
                min={0}
                max={creditValue}
                value={vznosValue}
                onInput={vznosInput}
                />
                <small
                id="firstContributionNumberHolder"
                className="form-text text-muted p-3"
                >
                Ваш первичный взнос в качестве погашения кредита
                </small>
            </div>
            <div className="card-body">
                <label htmlFor="returnPeriodText">Срок кредита:</label>
                <input
                type="text"
                id="returnPeriodText"
                className="form-control"
                aria-describedby="returnPeriodNumberHolder"
                value={srokValue + "  лет"}
                />
                <input
                type="range"
                className="form-control-range"
                id="returnPeriodRange"
                min={10}
                max={30}
                value={srokValue}
                onInput={srokInput}
                />
                <small id="returnPeriodNumberHolder" className="form-text text-muted p-3">
                Как долго в годах планируете возвращать долг.
                </small>
            </div>
            <div className="card-body">
                <label htmlFor="percentNumber">Годовая процентная ставка:</label>
                <input
                type="text"
                id="percentNumber"
                className="form-control"
                aria-describedby="percentNumberHolder"
                value={stavkaValue + " 5 %"}
                />
                <input
                type="range"
                className="form-control-range"
                min={5}
                max={20}
                value={stavkaValue}
                onInput={stavkaInput}
                step="0.01"
                />
                <small id="percentNumberHolder" className="form-text text-muted p-3">
                Столько процентов начисляется на ваш долг в год.
                </small>
            </div>
            <hr />
            <div className="card-footer">
                <p className="my-result">
                <strong>Ежемесячная ставка:</strong> <span id="payment">
                    {StavkaIpotekaMonth}  %
                    </span> 
                </p>
                <p className="my-result">
                <strong>Итого:</strong> <span id="payment">
                    {IpotekaMonth}
                    </span> ₽ в месяц
                </p>
                <small className="form-text text-muted">
                Общая выплата: <span id="common">
                    {AllSum} ₽
                </span>
                </small>
                <small className="form-text text-muted">
                Переплата: <span id="subpayment">
                    {Overprice} ₽</span>
                </small>
            </div>
            <p>
                    <div className="container">
                    <form className="feedback__form form p-5">
                    <p className="form__privacy form__privacy--bottom">
                        *Мы никому не передаем ваши данные. <br />И не сохраняем ваш номер в
                        базу.
                    </p>
                    <input
                        type="text"
                        className="form__input"
                        placeholder="Ваше имя"
                        autoComplete="off"
                    />
                    <input
                        data-tel-input=""
                        type="text"
                        className="form__input"
                        placeholder="Ваш телефон"
                        autoComplete="off"
                    />
                    <button type="submit" className="form__btn italic">
                        Отправить заявку
                    </button>
                    </form>
                    </div>
                </p>
            </div>
            <canvas id="graph" width={400} height={250} />
            </div>
            </div>
            

            <footer className="footer">
                <div className="container">
                <div className="footer__grid">
                    <div className="footer__logo">
                    <a href="#!">
                        <img src="./img/logo.svg" alt="Utopia Estates" />
                    </a>
                    </div>
                    <div className="footer__nav">
                    <nav>
                        <ul className="footer__nav-list">
                        <li>
                            <a href="#!">О комплексе</a>
                        </li>
                        <li>
                            <a href="#!">Район</a>
                        </li>
                        <li>
                            <a href="#!">Каталог квартир</a>
                        </li>
                        <li>
                            <a href="#!">Ипотека</a>
                        </li>
                        <li>
                            <a href="#!">Контакты</a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="footer__nav">
                    <nav>
                        <ul className="footer__nav-list">
                        <li>
                            <a href="#!">Поселение и переезд</a>
                        </li>
                        <li>
                            <a href="#!">Сервисные услуги</a>
                        </li>
                        <li>
                            <a href="#!">Экологическая устойчивость</a>
                        </li>
                        <li>
                            <a href="#!">Инвестиционные возможности</a>
                        </li>
                        <li>
                            <a href="#!">Программа лояльности</a>
                        </li>
                        </ul>
                    </nav>
                    </div>
                    <div className="footer__address">
                    <ul className="footer__nav-list">
                        <li>Адрес: Наб. реки Фонтанки 10-15</li>
                        <li>
                        Телефон: <a href="tel:+78121234567">8 (812) 123-45-67</a>
                        </li>
                        <li>Отдел продаж: 10:00 - 20:00</li>
                        <li>
                        E-mail:{" "}
                        <a className="link-bold" href="mailto:vip@lofthouse.ru">
                            vip@lofthouse.ru
                        </a>
                        </li>
                    </ul>
                    <ul className="footer__socials">
                        <li>
                        <a href="#!">
                            <img src="./img/socials/youtube.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/vk.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/facebook.svg" alt="" />
                        </a>
                        </li>
                        <li>
                        <a href="#!">
                            <img src="./img/socials/instagram.svg" alt="" />
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </footer>
        </>

    )
}