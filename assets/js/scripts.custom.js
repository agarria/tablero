"use strict";

var KTAppSettings = {
    "breakpoints": {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1200
    },
    "colors": {
        "theme": {
            "base": {
                "white": "#ffffff",
                "success": "#6993FF",
                "secondary": "#E5EAEE",
                "success": "#239a7f",
                "info": "#8950FC",
                "warning": "#FFA800",
                "danger": "#F64E60",
                "light": "#F3F6F9",
                "dark": "#212121"
            }
        },
        "gray": {
            "gray-100": "#F3F6F9",
            "gray-200": "#ECF0F3",
            "gray-300": "#E5EAEE",
            "gray-400": "#D6D6E0",
            "gray-500": "#B5B5C3",
            "gray-600": "#80808F",
            "gray-700": "#464E5F",
            "gray-800": "#1B283F",
            "gray-900": "#212121"
        }
    },
    "font-family": "Poppins"
};

var KTWidgets = function() {

    var _dashboard_chart = function() {
        var element = document.getElementById("dashboard_chart");

        if (!element) {
            return;
        }

        var options = {
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105]
            }],
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: ['30%'],
                    endingShape: 'rounded'
                },
            },
            legend: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                        fontSize: '12px',
                        fontFamily: KTApp.getSettings()['font-family']
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                        fontSize: '12px',
                        fontFamily: KTApp.getSettings()['font-family']
                    }
                }
            },
            fill: {
                opacity: 1
            },
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0
                    }
                }
            },
            tooltip: {
                style: {
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                },
                y: {
                    formatter: function(val) {
                        return "$" + val + " thousands"
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success'], KTApp.getSettings()['colors']['gray']['gray-300']],
            grid: {
                borderColor: KTApp.getSettings()['colors']['gray']['gray-200'],
                strokeDashArray: 4,
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            }
        };

        var chart = new ApexCharts(element, options);
        chart.render();
    }

    return {
        init: function() {

            _dashboard_chart();

        }
    }
}();

if (typeof module !== 'undefined') {
    module.exports = KTWidgets;
}

jQuery(document).ready(function() {
    KTWidgets.init();
});

var key = "https://docs.google.com/spreadsheets/d/1C2Wl5zAH3QPVhbuAMW4wftxnv7w9XzpS7P5rcLghlCc/pubhtml?gid=489792061&single=true";

var columns = [
	{"data": "no","title": "No."},
    {"data": "nombre","title": "Nombre"},
    {"data": "categoria","title": "Categoria"},
    {"data": "descripcion","title": "Descripción del Reporte:"},
    {"data": "telefono","title": "Teléfono"},
    {"data": "pais","title": "País"},
    {"data": "notas","title": "Notas"},
    {"data": "adjunto","title": "Adjunto"},
    {"data": "departamento","title": "Departamento"},
    {"data": "municipio","title": "Municipio"},
    {"data": "fecha","title": "Fecha de Reporte:"},
    {"data": "fecha_suceso","title": "Fecha de Suceso:"},
    {"data": "correo","title": "Correo Electronico:"},
    {"data": "mes","title": "Mes:"},
    {"data": "caso","title": "Caso:"},
    {"data": "empresa","title": "Empresa:"},
    {"data": "anonimo","title": "Anónimo:"},
    {"data": "categoriaglobal","title": "Categoría Global:"},
    {"data": "fecha_cierre","title": "Fecha de Cierre:"},
    {"data": "dias_cierre","title": "Días de Cierre:"},
	{"data": null,"title": "Detalles"}
];

$(document).ready(function() {

	function initializeTabletopObject() {
		Tabletop.init({
			key: key,
			callback: function(data, tabletop) {
				writeTable(data);
			},
			simpleSheet: true,
			debug: false
		});
	}

	initializeTabletopObject();

	function writeTable(data) {
		$('#reclamos_min_container').html(
			'<table class="table table-bordered table-checkable" id="reclamos_min"></table>'
		);

		$('#reclamos_full_container').html(
			'<table class="table table-bordered table-checkable" id="reclamos_full"></table>'
		);

		var table = $("#reclamos_min").DataTable({
			autoWidth: false,
			data: data,
			columns: columns,
			order: [
				[0, "asc"]
			],
	        dom: 'Bfrtip',
	        buttons: [
				'csv', 'excel', 'pdf', 
				{
			        extend: 'print',
			        text: 'Imprimir'
				}
	        ],
	        language: {
	            lengthMenu: "Mostrar _MENU_ reclamos por pagina",
	            zeroRecords: "No hay reclamos encontrados",
	            info: "Mostrando _START_ a _END_ de _TOTAL_ reclamos",
	            infoEmpty: "No hay reclamos",
	            search: "Buscar reclamos:",
	            infoFiltered: "(Filtrados _MAX_ reclamos)"
	        },
	        columnDefs: [
	            {
	                "targets": [3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19],
	                "visible": false,
	                "searchable": false
	            },
				{
					"targets": -1,
					"data": null,
					"defaultContent": "<button type='button' class='btn btn-success evidence-control'></button>"
				}
	        ]
		});

		var table = $("#reclamos_full").DataTable({
			autoWidth: false,
			data: data,
			columns: columns,
			order: [
				[0, "asc"]
			],
	        dom: 'Bfrtip',
	        buttons: [
				'csv', 'excel', 'pdf', 
				{
			        extend: 'print',
			        text: 'Imprimir'
				}
	        ],
	        language: {
	            lengthMenu: "Mostrar _MENU_ reclamos por pagina",
	            zeroRecords: "No hay reclamos encontrados",
	            info: "Mostrando _START_ a _END_ de _TOTAL_ reclamos",
	            infoEmpty: "No hay reclamos",
	            search: "Buscar reclamos:",
	            infoFiltered: "(Filtrados _MAX_ reclamos)"
	        },
	        columnDefs: [
	            {
	                "targets": [6,7,8,9,11,12,13,14,15,16,17,18,19],
	                "visible": false,
	                "searchable": false
	            },
				{
					"targets": -1,
					"data": null,
					"defaultContent": "<button type='button' class='btn btn-success evidence-control'></button>"
				}
	        ]
		});

		$('#reclamos_min tbody, #reclamos_full tbody').on('click', 'td button', function () {
			var tr = $(this).closest('tr');
			var row = table.row(tr);

			if (row.child.isShown()) {
				row.child.hide();
				tr.removeClass('show-evidence');
			}
			else {
				row.child(format(row.data())).show();
				tr.addClass('show-evidence');
			}
		});
	}

	function format(d) {
	    return '<div class="evidence-container">'+
	        '<div class="evidence-row">'+
	            '<span>Descripción del Reporte:</span>'+
	            '<span>'+d.descripcion+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Teléfono:</span>'+
	            '<span>'+d.telefono+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>País:</span>'+
	            '<span>'+d.pais+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Notas:</span>'+
	            '<span>'+d.notas+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Adjunto:</span>'+
	            '<span><a title="Click para ver" href="'+d.adjunto+'" target="_blank"><img class="evidence-img" src="'+d.adjunto+'"></a></span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Departamento:</span>'+
	            '<span>'+d.departamento+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Municipio:</span>'+
	            '<span>'+d.municipio+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Fecha de Suceso:</span>'+
	            '<span>'+d.fecha_suceso+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Correo Electronico:</span>'+
	            '<span><a href="mailto:'+d.correo+'">'+d.correo+'</a></span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Mes:</span>'+
	            '<span>'+d.mes+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Caso:</span>'+
	            '<span>'+d.caso+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Empresa:</span>'+
	            '<span>'+d.empresa+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Anónimo:</span>'+
	            '<span>'+d.anonimo+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Categoría Global:</span>'+
	            '<span>'+d.categoriaglobal+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Fecha de Cierre:</span>'+
	            '<span>'+d.fecha_cierre+'</span>'+
	        '</div>'+
	        '<div class="evidence-row">'+
	            '<span>Días de Cierre:</span>'+
	            '<span>'+d.dias_cierre+'</span>'+
	        '</div>'+
	    '</div>';
	}

});