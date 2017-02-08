/**
 * @author alteredq / http://alteredqualia.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

THREE.OAVLoader = function ( manager ) {

	this.manager = ( manager !== undefined ) ? manager : THREE.DefaultLoadingManager;

};

THREE.OAVLoader.prototype = {

	constructor: THREE.OAVLoader,

	load: function ( url, onLoad, onProgress, onError ) {

		var scope = this;

		var loader = new THREE.FileLoader( scope.manager );
		loader.load( url, function ( text ) {

			var json = scope.parseOAV( text );
			scope.createModel( json, onLoad );

		}, onProgress, onError );

	},

	// Based on CanvasMol OAV parser

	parseOAV: function ( text ) {

		function trim( text ) {

			return text.replace( /^\s\s*/, '' ).replace( /\s\s*$/, '' );

		}

		function capitalize( text ) {

			return text.charAt( 0 ).toUpperCase() + text.substr( 1 ).toLowerCase();

		}

		function hash( s, e ) {

			return "s" + Math.min( s, e ) + "e" + Math.max( s, e );

		}

		function parseBond( start, length ) {

			var eatom = parseInt( lines[ i ].substr( start, length ) );

			if ( eatom ) {

				var h = hash( satom, eatom );

				if ( bhash[ h ] === undefined ) {

					bonds.push( [ satom - 1, eatom - 1, 1 ] );
					bhash[ h ] = bonds.length - 1;

				} else {

					// doesn't really work as almost all OAVs
					// have just normal bonds appearing multiple
					// times instead of being double/triple bonds
					// bonds[bhash[h]][2] += 1;

				}

			}

		}

		var CPK = { "H": [ 255, 255, 255 ], "HE": [ 217, 255, 255 ], "LI": [ 204, 128, 255 ], "BE": [ 194, 255, 0 ], "B": [ 255, 181, 181 ], "C": [ 144, 144, 144 ], "N": [ 48, 80, 248 ], "O": [ 255, 13, 13 ], "F": [ 144, 224, 80 ], "NE": [ 179, 227, 245 ], "NA": [ 171, 92, 242 ], "MG": [ 138, 255, 0 ], "AL": [ 191, 166, 166 ], "SI": [ 240, 200, 160 ], "P": [ 255, 128, 0 ], "S": [ 255, 255, 48 ], "CL": [ 31, 240, 31 ], "AR": [ 128, 209, 227 ], "K": [ 143, 64, 212 ], "CA": [ 61, 255, 0 ], "SC": [ 230, 230, 230 ], "TI": [ 191, 194, 199 ], "V": [ 166, 166, 171 ], "CR": [ 138, 153, 199 ], "MN": [ 156, 122, 199 ], "FE": [ 224, 102, 51 ], "CO": [ 240, 144, 160 ], "NI": [ 80, 208, 80 ], "CU": [ 200, 128, 51 ], "ZN": [ 125, 128, 176 ], "GA": [ 194, 143, 143 ], "GE": [ 102, 143, 143 ], "AS": [ 189, 128, 227 ], "SE": [ 255, 161, 0 ], "BR": [ 166, 41, 41 ], "KR": [ 92, 184, 209 ], "RB": [ 112, 46, 176 ], "SR": [ 0, 255, 0 ], "Y": [ 148, 255, 255 ], "ZR": [ 148, 224, 224 ], "NB": [ 115, 194, 201 ], "MO": [ 84, 181, 181 ], "TC": [ 59, 158, 158 ], "RU": [ 36, 143, 143 ], "RH": [ 10, 125, 140 ], "PD": [ 0, 105, 133 ], "AG": [ 192, 192, 192 ], "CD": [ 255, 217, 143 ], "IN": [ 166, 117, 115 ], "SN": [ 102, 128, 128 ], "SB": [ 158, 99, 181 ], "TE": [ 212, 122, 0 ], "I": [ 148, 0, 148 ], "XE": [ 66, 158, 176 ], "CS": [ 87, 23, 143 ], "BA": [ 0, 201, 0 ], "LA": [ 112, 212, 255 ], "CE": [ 255, 255, 199 ], "PR": [ 217, 255, 199 ], "ND": [ 199, 255, 199 ], "PM": [ 163, 255, 199 ], "SM": [ 143, 255, 199 ], "EU": [ 97, 255, 199 ], "GD": [ 69, 255, 199 ], "TB": [ 48, 255, 199 ], "DY": [ 31, 255, 199 ], "HO": [ 0, 255, 156 ], "ER": [ 0, 230, 117 ], "TM": [ 0, 212, 82 ], "YB": [ 0, 191, 56 ], "LU": [ 0, 171, 36 ], "HF": [ 77, 194, 255 ], "TA": [ 77, 166, 255 ], "W": [ 33, 148, 214 ], "RE": [ 38, 125, 171 ], "OS": [ 38, 102, 150 ], "IR": [ 23, 84, 135 ], "PT": [ 208, 208, 224 ], "AU": [ 255, 209, 35 ], "HG": [ 184, 184, 208 ], "TL": [ 166, 84, 77 ], "PB": [ 87, 89, 97 ], "BI": [ 158, 79, 181 ], "PO": [ 171, 92, 0 ], "AT": [ 117, 79, 69 ], "RN": [ 66, 130, 150 ], "FR": [ 66, 0, 102 ], "RA": [ 0, 125, 0 ], "AC": [ 112, 171, 250 ], "TH": [ 0, 186, 255 ], "PA": [ 0, 161, 255 ], "U": [ 0, 143, 255 ], "NP": [ 0, 128, 255 ], "PU": [ 0, 107, 255 ], "AM": [ 84, 92, 242 ], "CM": [ 120, 92, 227 ], "BK": [ 138, 79, 227 ], "CF": [ 161, 54, 212 ], "ES": [ 179, 31, 212 ], "FM": [ 179, 31, 186 ], "MD": [ 179, 13, 166 ], "NO": [ 189, 13, 135 ], "LR": [ 199, 0, 102 ], "RF": [ 204, 0, 89 ], "DB": [ 209, 0, 79 ], "SG": [ 217, 0, 69 ], "BH": [ 224, 0, 56 ], "HS": [ 230, 0, 46 ], "MT": [ 235, 0, 38 ], "DS": [ 235, 0, 38 ], "RG": [ 235, 0, 38 ], "CN": [ 235, 0, 38 ], "UUT": [ 235, 0, 38 ], "UUQ": [ 235, 0, 38 ], "UUP": [ 235, 0, 38 ], "UUH": [ 235, 0, 38 ], "UUS": [ 235, 0, 38 ], "UUO": [ 235, 0, 38 ] };


		var atoms = [];
		var bonds = [];
		var histogram = {};

		var bhash = {};

		var lines = text.split( "\n" );

		var x, y, z, e;

        var previousResidue = {};

        // Example of a line from Ingvar's reduce representation.
        // " -0.598 -2.256 62.972 0.000 0.000 0.000 -65536 0.000 0.000 1eg0:I:2:N"
		for ( var i = 0, l = lines.length; i < l; ++ i ) {
            coord = lines[i].split(/\s+/);

			if ( coord.length == 11) {

				x = parseFloat( coord[1] );
				y = parseFloat( coord[2] );
				z = parseFloat( coord[3] );

				e = coord[10].split(':'); // 1eg0:I:2:N

				if ( e.length ) {
				    //atoms.push( [ x, y, z, CPK[ e[3] ], e[3] ] );
				    atoms.push( [ x, y, z, [144, 144, 144], e[3] ] );
                }

				if ( histogram[ e[3] ] === undefined ) histogram[ e[3] ] = 1;
				else histogram[ e[3] ] += 1;

				if (previousResidue['number'] !== undefined){
                    if (previousResidue['number'] == e[2] - 1 && 
                            previousResidue['chain'] === e[1]){

                            var h = hash( i - 2 , i - 1);

                            if ( bhash[ h ] === undefined ) {
                                bonds.push( [ i - 2 , i - 1, 1 ] );
                                bhash[ h ] = bonds.length - 1;
                            }
                    }
                }

                previousResidue['number'] = e[2];
                previousResidue['chain'] = e[1];

			}

		}

		return { "ok": true, "atoms": atoms, "bonds": bonds, "histogram": histogram };
	},

	createModel: function ( json, callback ) {

		var geometryAtoms = new THREE.BufferGeometry();
		var geometryBonds = new THREE.BufferGeometry();

		var i, l;

		var verticesAtoms = [];
		var colors = [];
		var verticesBonds = [];

		geometryAtoms.elements = [];

		var atoms = json.atoms;
		var bonds = json.bonds;

		for ( i = 0, l = atoms.length; i < l; i ++ ) {

			var atom = atoms[ i ];

			var x = atom[ 0 ];
			var y = atom[ 1 ];
			var z = atom[ 2 ];

			verticesAtoms.push( x, y, z );

			var r = atom[ 3 ][ 0 ] / 255;
			var g = atom[ 3 ][ 1 ] / 255;
			var b = atom[ 3 ][ 2 ] / 255;

			colors.push( r, g, b );

			geometryAtoms.elements.push( atom[ 4 ] );

		}

		for ( i = 0, l = bonds.length; i < l; i ++ ) {

			var bond = bonds[ i ];

			var start = bond[ 0 ];
			var end = bond[ 1 ];

			verticesBonds.push( verticesAtoms[ ( start * 3 ) + 0 ] );
			verticesBonds.push( verticesAtoms[ ( start * 3 ) + 1 ] );
			verticesBonds.push( verticesAtoms[ ( start * 3 ) + 2 ] );

			verticesBonds.push( verticesAtoms[ ( end * 3 ) + 0 ] );
			verticesBonds.push( verticesAtoms[ ( end * 3 ) + 1 ] );
			verticesBonds.push( verticesAtoms[ ( end * 3 ) + 2 ] );

		}

		geometryAtoms.addAttribute( 'position', new THREE.Float32BufferAttribute( verticesAtoms, 3 ) );
		geometryAtoms.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

		geometryBonds.addAttribute( 'position', new THREE.Float32BufferAttribute( verticesBonds, 3 ) );

		callback( geometryAtoms, geometryBonds, json );

	}

};
