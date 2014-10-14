$(function(){ // on dom ready


//response
var jsontext_old = [{"n_tables":254,"ports":[{"hw_addr":"6a:43:eb:72:f9:a6","name":"s1-eth1","port_no":1},{"hw_addr":"26:21:db:05:0c:3c","name":"s1-eth2","port_no":2},{"hw_addr":"ae:ab:37:17:08:4e","name":"s1","port_no":65534}],"dpid":"00-00-00-00-00-01"},
{"n_tables":254,"ports":[{"hw_addr":"22:61:48:86:af:96","name":"s2-eth1","port_no":1},{"hw_addr":"5e:e4:8b:78:42:c1","name":"s2-eth2","port_no":2},{"hw_addr":"ee:c3:9b:e5:8f:c8","name":"s2-eth3","port_no":3},{"hw_addr":"76:bd:34:0a:de:44","name":"s2","port_no":65534}],"dpid":"00-00-00-00-00-02"},
{"n_tables":254,"ports":[{"hw_addr":"f2:b0:b3:2a:ef:6e","name":"s3-eth1","port_no":1},{"hw_addr":"de:56:24:ec:0b:50","name":"s3-eth2","port_no":2},{"hw_addr":"12:ca:92:49:d6:47","name":"s3","port_no":65534}],"dpid":"00-00-00-00-00-03"}];

jsontext = {"switches":[{"dpid":"00-00-00-00-00-01"},{"dpid":"00-00-00-00-00-02"},{"dpid":"00-00-00-00-00-03"},{"dpid":"00-00-00-00-00-04"},{"dpid":"00-00-00-00-00-05"},{"dpid":"00-00-00-00-00-06"},{"dpid":"00-00-00-00-00-07"}],
"links":[["00-00-00-00-00-01","00-00-00-00-00-05"],["00-00-00-00-00-02","00-00-00-00-00-03"],["00-00-00-00-00-05","00-00-00-00-00-06"],["00-00-00-00-00-05","00-00-00-00-00-07"],["00-00-00-00-00-02","00-00-00-00-00-04"],["00-00-00-00-00-01","00-00-00-00-00-02"]]}

var nodes1 = [];
var edges1 = [];

//alert(objectLength(jsontext.switches));
for (var i = 0; i < objectLength(jsontext.switches); i++) {
  //alert(jsontext.switches[i].dpid);
  //length of ports of each
  nodes1 += { data: { id: jsontext.switches[i].dpid, name: jsontext.switches[i].dpid, weight: 65, faveColor: '#6FB1FC', faveShape: 'triangle' } }; 
}

for (var i = 0; i < objectLength(jsontext.links); i++) {
  //length of ports of each
  alert(jsontext.links[i][0]+' '+jsontext.links[i][1]);
  edges1 += { data: { source: jsontext.links[i][0], target: jsontext.links[i][1], faveColor: '#6FB1FC', strength: 50 } };
}

//Genereate nodes


function objectLength(obj) {
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}


$('#cy').cytoscape({
  layout: {
    name: 'cose',
    padding: 10
  },
  
  style: cytoscape.stylesheet()
    .selector('node')
      .css({
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff'
      })
    .selector(':selected')
      .css({
        'border-width': 3,
        'border-color': '#333'
      })
    .selector('edge')
      .css({
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'circle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'
      })
    .selector('edge.questionable')
      .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
      })
    .selector('.faded')
      .css({
        'opacity': 0.25,
        'text-opacity': 0
      }),
  
  elements: {
    nodes: [
      { data: { id: 'j', name: 'Node 1', weight: 65, faveColor: '#6FB1FC', faveShape: 'triangle' } },
      { data: { id: 'e', name: 'Node 2', weight: 45, faveColor: '#EDA1ED', faveShape: 'triangle' } },
      { data: { id: 'k', name: 'Node 3', weight: 75, faveColor: '#86B342', faveShape: 'triangle' } },
      { data: { id: 'g', name: 'node 4', weight: 70, faveColor: '#F5A45D', faveShape: 'triangle' } }
    ],
    edges: [
      { data: { source: 'j', target: 'e', faveColor: '#6FB1FC', strength: 50 } },
      { data: { source: 'j', target: 'k', faveColor: '#6FB1FC', strength: 50 } },
      { data: { source: 'j', target: 'g', faveColor: '#6FB1FC', strength: 50 } },
     
      { data: { source: 'e', target: 'j', faveColor: '#EDA1ED', strength: 50 } },
      { data: { source: 'e', target: 'k', faveColor: '#EDA1ED', strength: 50 }, classes: 'questionable' },
      
      { data: { source: 'k', target: 'j', faveColor: '#86B342', strength: 50 } },
      { data: { source: 'k', target: 'e', faveColor: '#86B342', strength: 50 } },
      { data: { source: 'k', target: 'g', faveColor: '#86B342', strength: 50 } },
      
      { data: { source: 'g', target: 'j', faveColor: '#F5A45D', strength: 50 } }
    ]
  },
  
  ready: function(){
    window.cy = this;
    
    // giddy up
  }
});






}); // on dom ready

