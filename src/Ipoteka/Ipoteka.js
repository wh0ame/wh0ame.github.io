import React, { useState, useEffect } from "react";
import './IpotekaStyle.css';
import SmallHeader from "../layouts/SmallHeader";

export default function Ipoteka() {
    const [creditValue, setCreditValue] = useState(12000000);
    const [vznosValue, setVznosValue] = useState(2500000);
    const [srokValue, setSrokValue] = useState(10);
    const [stavkaValue, setStavkaValue] = useState(3.5);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Форматирование чисел
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            maximumFractionDigits: 0
        }).format(value);
    };

    // Расчет ипотеки
    const calculateMortgage = () => {
        const loanAmount = creditValue - vznosValue;
        const monthlyRate = stavkaValue / 100 / 12;
        const months = srokValue * 12;
        
        if (monthlyRate === 0) {
            return {
                monthlyPayment: loanAmount / months,
                totalPayment: loanAmount,
                overpayment: 0
            };
        }

        const monthlyPayment = loanAmount * 
            (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
            (Math.pow(1 + monthlyRate, months) - 1);
        
        const totalPayment = monthlyPayment * months;
        const overpayment = totalPayment - loanAmount;

        return {
            monthlyPayment,
            totalPayment,
            overpayment
        };
    };

    const { monthlyPayment, totalPayment, overpayment } = calculateMortgage();

    // Обработчики изменения полей
    const handleCreditChange = (e) => {
        const value = parseInt(e.target.value);
        setCreditValue(value);
        if (vznosValue > value) {
            setVznosValue(value);
        }
    };

    const handleVznosChange = (e) => {
        const value = parseInt(e.target.value);
        setVznosValue(Math.min(value, creditValue));
    };

    const handleSrokChange = (e) => {
        setSrokValue(parseInt(e.target.value));
    };

    const handleStavkaChange = (e) => {
        setStavkaValue(parseFloat(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь можно добавить логику отправки данных
        alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    };

    return (
        <>
            <SmallHeader />
            <div className="ipoteka-container">
                <div className="ipoteka-card">
                    <h1 className="ipoteka-title">Калькулятор кредита</h1>
                    
                    <div className="ipoteka-inputs">
                        <div className="input-group">
                            <label>Стоимость недвижимости</label>
                            <div className="input-value">{formatCurrency(creditValue)}</div>
                            <input
                                type="range"
                                min="1000000"
                                max="50000000"
                                step="100000"
                                value={creditValue}
                                onChange={handleCreditChange}
                                className="ipoteka-slider"
                            />
                            <div className="input-description">Сумма, которую за вас заплатит банк</div>
                        </div>

                        <div className="input-group">
                            <label>Первоначальный взнос</label>
                            <div className="input-value">{formatCurrency(vznosValue)}</div>
                            <input
                                type="range"
                                min="0"
                                max={creditValue}
                                step="100000"
                                value={vznosValue}
                                onChange={handleVznosChange}
                                className="ipoteka-slider"
                            />
                            <div className="input-description">Ваш первичный взнос в качестве погашения кредита</div>
                        </div>

                        <div className="input-group">
                            <label>Срок кредита</label>
                            <div className="input-value">{srokValue} лет</div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                step="1"
                                value={srokValue}
                                onChange={handleSrokChange}
                                className="ipoteka-slider"
                            />
                            <div className="input-description">Как долго планируете возвращать долг</div>
                        </div>

                        <div className="input-group">
                            <label>Годовая процентная ставка</label>
                            <div className="input-value">{stavkaValue}%</div>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                step="0.1"
                                value={stavkaValue}
                                onChange={handleStavkaChange}
                                className="ipoteka-slider"
                            />
                            <div className="input-description">Проценты, начисляемые на ваш долг в год</div>
                        </div>
                    </div>

                    <div className="ipoteka-results">
                        <div className="result-item">
                            <span className="result-label">Ежемесячный платеж:</span>
                            <span className="result-value">{formatCurrency(monthlyPayment)}</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Общая выплата:</span>
                            <span className="result-value">{formatCurrency(totalPayment)}</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Переплата:</span>
                            <span className="result-value">{formatCurrency(overpayment)}</span>
                        </div>
                    </div>

                    <div className="ipoteka-form">
                        <h2>Оформить заявку</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Ваше имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="tel"
                                    placeholder="Ваш телефон"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                Отправить заявку
                            </button>
                        </form>
                        <p className="disclaimer">
                            *Мы никому не передаем ваши данные.<br />
                            И не сохраняем ваш номер в базу.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}