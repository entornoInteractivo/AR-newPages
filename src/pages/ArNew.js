import React from "react";
import Badge from "../components/Badge";
import firebase from 'firebase';

import '../global.css'

import  '../components/styles/stylesPagesFriend.css'

import BadgeForm from '../components/BadgeForm'


class ArNew extends React.Component {
    state = {
        form: [],
    }

    componentDidMount () {

        firebase.database().ref('form').on('child_added', snapshot => {
            this.setState ({
                form: this.state.form.concat(snapshot.val())
            })
        })


    }

    handleChange = e => {
        const nextForm = this.state.form
        nextForm[e.target.name] = e.target.value
        this.setState ({
            form: nextForm,
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const record = {
            nombreMarca: this.state.form.nombreMarca,
            nombreProducto: this.state.form.nombreProducto,
            precioProducto: this.state.form.precioProducto,
            descripcionProducto: this.state.form.descripcionProducto
        }

        const dbRef = firebase.database().ref('form');
        const newPage = dbRef.push();
        newPage.set(record);
       
    }

    render() {
        return (
            <div className="page">
                <div className="interaction">
                    <div className="colUna">
                        <Badge 
                            marca={this.state.form.nombreMarca || 'iobbu'}
                            nombreProducto={this.state.form.nombreProducto || 'Paginas Web Interactivas'}
                            precio={this.state.form.precioProducto || '980.400'}
                            description={this.state.form.descripcionProducto || 'Responsive, Innovador, Seguro'}
                        />
                    </div>
                    <div className="colForm">
                        <BadgeForm 
                            onChange={this.handleChange}
                            onSubmit={this.handleSubmit} 
                            formValues={this.state.form}/>
                    </div>

                </div>
                {
                  this.state.form.map(pageAR => (
                    <React.Fragment>
                        <div className="pageFriend">
                             <img src={pageAR.image}/>
                         <div>                                    
                             <h1>{pageAR.nombreMarca}</h1>
                             <p>{pageAR.nombreProducto}</p>
                             <h2>Description:</h2>
                             <p>{pageAR.descripcionProducto} por ${pageAR.precioProducto}</p> 
                         </div>
                         <button className="buttonNew">VER PÁGINA</button>
                         </div>
                    </React.Fragment>
                    ))      
                }
            </div>
        )
    }
}

export default ArNew;