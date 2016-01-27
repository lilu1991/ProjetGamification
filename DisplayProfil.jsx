// Remplacer par la fonction qui recupère les données
var DataUsers=
[
    {
        "ID":"0",
        "prenom":"Ilyas",
        "nom":"BABA",
        "mail":"ilyas.baba@icloud.com",
        "Poste":"Dev",
        "periode":"1",
        "periode1":
        {
            "point":"1000",
            "badge":[
                        {
                            "type":"BuzzEclair",
                            "nombre":"2"
                    },
                    {
                            "type":"Star",
                            "nombre":"3"
                        }
                    ],
            "trphee":[
                    {
                            "type":"10XBuzzEclair",
                            "nombre":"1"
                        },
                    {
                        "type":"10XStar",
                        "nombre":"2"
                        }
                    ]
        }
    }
];

//afficher les point
var PointComponent = React.createClass({
    render: function() {
        return(
                    <div>{this.props.user}, vous avez gagné {this.props.point}</div>   
        );
    }
});
var DisplayPoint = React.createClass({
    render: function() {
        return(
				<PointComponent user={DataUsers[0].prenom} point={DataUsers[0].point}></PointComponent>
        );
    }
});

//afichier le prenom
var NameComponent = React.createClass({
    render: function() {
        return(
                <div>{this.props.user}</div>
        );
    }
});

//Affichage
var DisplayName = React.createClass({
    render: function() {
        return(
                <NameComponent user={DataUsers[0].prenom}></NameComponent>
        );
    }
});


var Display = React.createClass({
    render: function() {
        return(
                <div>baba</div>
        );
    }
});

// on creer l'objet
// on creer la fonction qui peuple l'ogbet
// on désigne ou l'aficher dans l'index
