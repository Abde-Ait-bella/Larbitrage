import { React, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';


export function Changement(props) {

    const [state, setState] = useState({
        joueurs: [],
        joueursCreat: [],
        joueursLicence: [],
        clubs: [],
    });

    const [change, setChange] = useState([{}]);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [joueurResponse, clubResponse, matcheRespose] = await Promise.all([
                    axios.get('http://localhost:8000/api/joueur'),
                    axios.get('http://localhost:8000/api/club'),
                    axios.get('http://localhost:8000/api/matche')
                ]);

                const dataJoueurs = joueurResponse.data;
                const optionJoueursEntr = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_entr"
                }))
                const optionJoueursSort = dataJoueurs?.map(item => ({
                    value: item.nom,
                    label: item.nom.toUpperCase(),
                    name: "joueur_nom_sort"
                }))
                const optionJoueursLic4enceE = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_entr"
                }))

                const optionJoueursLic4enceS = dataJoueurs?.map(item => ({
                    value: item.joueur_numero_licence,
                    label: item.joueur_numero_licence.toUpperCase(),
                    name: "joueur_licence_sort"
                }))

                const dataClubs = clubResponse.data;
                const optionClubs = dataClubs?.map(item => ({
                    value: item.id,
                    label: "(" + item.nom + ")"+" "+ item.abbr,
                    name: "club_id"
                }))

                const dataMatch = matcheRespose.data;
                if (!dataMatch || dataMatch.length === 0) {
                    var matchNamber = [0]
                } else (
                    matchNamber = dataMatch.map(item => item.id)
                )

                setState(prevData => ({
                    ...prevData,
                    clubs: optionClubs,
                    matchNamber: parseInt(matchNamber.pop() + 1)
                }))
                setOptionsJEntr(optionJoueursEntr);
                setOptionsJSort(optionJoueursSort);
                setOptionsLicenceE(optionJoueursLic4enceE);
                setOptionsLicenceS(optionJoueursLic4enceS);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //--------Sélection joueur entrant

    const createOptionJEntr = (label: string) => ({
        label : label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_entr"
    });

    const [isLoadingJEntr, setIsLoadingJEntr] = useState(false);
    const [optionsJEntr, setOptionsJEntr] = useState();
    const [valueJEntr, setValueJEntr] = useState();

    const handleCreateJEntr = (inputValue: string) => {
        setIsLoadingJEntr(true);
        setTimeout(() => {
            const newOption = createOptionJEntr(inputValue);
            setIsLoadingJEntr(false);
            setOptionsJEntr((prev) => [...prev, newOption]);
            setValueJEntr(newOption);
        }, 1000);
    };

    const handleChangeSelectJEntr = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_entr"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange);

        } else {
            setValueJEntr(event)
            const { name, value } = valeur;
            const newChnage = [...change];
            newChnage[index][name] = value
            setChange(newChnage)
        }
        setValueJEntr(event);
    }

    //--------Sélection du joueur sortant

    const createOptionJSort = (label: string) => ({
        label : label.toUpperCase(),
        value: label.toLowerCase(),
        name: "joueur_nom_sort"
    });

    const [isLoadingJSort, setIsLoadingJSort] = useState(false);
    const [optionsJSort, setOptionsJSort] = useState();
    const [valueJSort, setValueJSort] = useState();

    const handleCreateSort = (inputValue: string) => {
        setIsLoadingJSort(true);
        setTimeout(() => {
            const newOption = createOptionJSort(inputValue);
            setIsLoadingJSort(false);
            setOptionsJSort((prev) => [...prev, newOption]);
            setValueJSort(newOption);
        }, 1000);
    };

    const handleChangeSelectJSort = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_nom_sort"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)


        } else {
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        }
        setValueJSort(event)
    }

    //-----Sélection licence de joueur entrant

    const createOptionLicenceE = (label: string) => ({
        label : label.toUpperCase(),
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_entr"
    });


    const [isLoadingLicenceE, setIsLoadingLicenceE] = useState(false);
    const [optionsLicenceE, setOptionsLicenceE] = useState();
    const [valueLicenceE, setValueLicenceE] = useState();


    const handleCreateLicenceE = (inputValue: string) => {
        setIsLoadingLicenceE(true);
        setTimeout(() => {
            const newOption = createOptionLicenceE(inputValue);
            setIsLoadingLicenceE(false);
            setOptionsLicenceE((prev) => [...prev, newOption]);
            setValueLicenceE(newOption);
        }, 1000);
    };

    const handleChangeSelectLicenceE = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_numero_licence"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        } else {
            // setValueLicenceE(valeur)
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        }
        setValueLicenceE(event);
    }


    //-----Sélection licence de joueur sortant

    const createOptionLicenceS = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
        name: "joueur_licence_sort"
    });


    const [isLoadingLicenceS, setIsLoadingLicenceS] = useState(false);
    const [optionsLicenceS, setOptionsLicenceS] = useState();
    const [valueLicenceS, setValueLicenceS] = useState();


    const handleCreateLicenceS = (inputValue: string) => {
        setIsLoadingLicenceS(true);
        setTimeout(() => {
            const newOption = createOptionLicenceS(inputValue);
            setIsLoadingLicenceS(false);
            setOptionsLicenceS((prev) => [...prev, newOption]);
            setValueLicenceS(newOption);
        }, 1000);
    };

    const handleChangeSelectLicenceS = (event, index) => {
        let valeur = event
        if (valeur === null) {
            valeur = {
                value: "",
                name: "joueur_licence_sort"
            }
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        } else {
            setValueLicenceS(valeur)
            const { name, value } = valeur;
            const newChange = [...change];
            newChange[index][name] = value;
            setChange(newChange)
        }
        setValueLicenceS(event);
    }


    const handleChangeSelect = (event, index) => {
        const { name, value } = event;
        const newChange = [...change];
        newChange[index][name] = value;
        newChange[index].matche_id = state.matchNamber;
        setChange(newChange)

    }
    console.log(change)
    const handleChangeInput = (event, index) => {
        const { name, value } = event.target;
        const newChange = [...change];
        newChange[index][name] = value;
        setChange(newChange);
    }


    const addRow = () => {
        setChange([...change, {}])
        setValueJEntr();
        setValueJSort();
        setValueLicenceE();
        setValueLicenceS();
    };

    const SuppRow = (index) => {
        const newChnage = [...change];
        newChnage.splice(index, 1);
        setChange(newChnage);
    };

    const [isValide, setIsValide] = useState();

    const sendData = () => {
        props.dataChangement(change);
        setIsValide(prev => !prev);
    };

    return (
        <>
            <div className="row my-2">
                <div className="col-md-12">
                    <div class=" card text-center bg-light text-white">
                        <div class="card-header bg-secondary">
                            التغييرات
                        </div>
                        <div class="card-body">
                            {change.map((item, index) => (
                                <div className="row border border-secondary border-4 rounded py-3 px-2 my-1 mt-3" key={index}>
                                    <div className="form-group col-md-4">
                                        <label>الفريق</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light' options={state.clubs} onChange={(event) =>handleChangeSelect(event, index)} placeholder="اكتب" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label>اسم الاعب الداخل</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingJEntr}
                                                isLoading={isLoadingJEntr}
                                                onChange={(event) =>handleChangeSelectJEntr(event, index)}
                                                onCreateOption={handleCreateJEntr}
                                                options={optionsJEntr}
                                                value={valueJEntr}
                                                placeholder="أكتب او اختر"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >رقم الاعب الداخل</label>
                                        <div className='my-2'>
                                            <input type="text" name='joueur_num_entr' onChange={(event) =>handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label >رقم رخصة الداخل</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingLicenceE}
                                                isLoading={isLoadingLicenceE}
                                                onChange={(event) =>handleChangeSelectLicenceE(event, index)}
                                                onCreateOption={handleCreateLicenceE}
                                                options={optionsLicenceE}
                                                value={valueLicenceE}
                                                placeholder='أكتب واختر'
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label >اسم الاعب الخارج</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingJSort}
                                                isLoading={isLoadingJSort}
                                                onChange={(event) =>handleChangeSelectJSort(event, index)}
                                                onCreateOption={handleCreateSort}
                                                options={optionsJSort}
                                                value={valueJSort}
                                                placeholder="أكتب او اختر"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label >رقم رخصة الخارج</label>
                                        <div className='my-2'>
                                            <CreatableSelect className='text-light'
                                                isClearable
                                                isDisabled={isLoadingLicenceS}
                                                isLoading={isLoadingLicenceS}
                                                onChange={(event) =>handleChangeSelectLicenceS(event, index)}
                                                onCreateOption={handleCreateLicenceS}
                                                options={optionsLicenceS}
                                                value={valueLicenceS}
                                                placeholder='أكتب واختر'
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >رقم الاعب الخارج</label>
                                        <div className='my-2'>
                                            <input type="text" name='joueur_num_sort' onChange={(event) =>handleChangeInput(event, index)} className="form-control bg-white border-light my-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >الدقيقة</label>
                                        <div className='my-2'>
                                            <input type="text" name='minute' onChange={(event) =>handleChangeInput(event, index)} className="form-control bg-white border-light mt-2 mb-2" id="inputPassword4" />
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <button className='btn btn-danger moin rounded-pill' onClick={() =>SuppRow(index)}><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-center mt-3'>
                                <div>
                                    <button className='btn btn-warning rounded-pill' onClick={addRow}><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                            <div className='d-flex justify-content-right pt-2'>
                                <button className={`btn  ${isValide ? 'btn-warning text-danger' : 'btn-secondary'}`} onClick={sendData}>Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
