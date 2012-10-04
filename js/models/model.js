function Event(names, args){
	this.names = names; 
	this.args = args; 
	this.done = []; 
}; 


function Model(args){
	
	if(!args){
		args = {};
	}
	
	this.label = args.label?args.label:""; 
	this.father = args.father?args.father:null; 
	this.field = args.value; 
	
	this.fields = []; 
	
	this.events = {}; 
	
	this.event = function(event_name, func){
		if(!func){
			alert('Invalid Func!'); 
		}; 
		if(!this.events[event_name]){
			this.events[event_name] = []; 
		}
		this.events[event_name].push(func); 
		return func; 
	}; 
	
	this.remove_event = function(event_name, func){
		if(event_name in this.events){
			i = this.events[event_name].indexOf(func); 
			if(i != -1){
				this.events[event_name].splice(i, 1); 
			}
		}
	}; 
	
	this.trigger_event = function(event){
		
		if(!(this in event.done)){
			event.done.push(this); 

			if(this.father){
				this.father.trigger_event(new Event(['change', ], {'model': this.father, 'event': event})); 
			}; 
			
			for(i in event.names){
				if(event.names[i] in this.events){
					var e = this.events[event.names[i]]; 
					for(j in e){
						e[j](event); 
					}
				}
			}
			
		}
	}; 
	
	this.toogle = function(){
		this.field = !this.field; 
		this.trigger_event(new Event(['change', 'set'], {'model':this}) ); 
	}; 
	
	this.set = function(value){
		if(!(this.field == value)){
			this.field = value; 
			this.trigger_event(new Event(['change', 'set'], {'model':this}) ); 
		}
	}; 
	
	this.get = function(){
		return this.field; 
	}; 

	
	this.getName = function(){
		return ""; 
	};

	this.mkField = function(args){
		args.father = this; 
		var n = new Model(args); 
		this[args.label] = n; 
		this.fields.push(n); 
	}; 

	this.insertInList = function(item, list){
		if(list.indexOf(item) == -1){
			list.push(item); 
			return true; 
		} 
		return false; 
	}; 

	this.change = function(event){
		this.trigger_event(new Event(['change'], {'model':this, 'event': event})); 
	}.bind(this); 

	this.insert = function(item){
		if(insertInList(item, this.field)){
			item.event('change', this.change); 
			this.trigger_event(new Event(['change', 'add'], {'model':this, 'index': list.length-1}) ); 
		} 
	}; 

	this.removeInList = function(item, list){
		var i = list.indexOf(item); 
		if(i != -1){
			list.splice(i, 1); 
			return true; 	
		}
		return false; 
	}; 

	this.remove = function(item){		
		if(this.removeInList(item, this.field)){ 
			item.remove_event('change', this.change); 
			this.trigger_event(new Event(['change', 'remove'], {'model':this, 'index': index}) ); 
		}
	}; 

	this.remove_index = function(index){
		item = this.field[index]; 
		this.remove(item); 
	}; 

	
	this.add = function(item){
		this.field.push(item); 
		item.event('change', this.change); 
		this.trigger_event(new Event(['change', 'add'], {'model':this, 'index': this.field.length-1}) ); 
	}; 
	
	this.get_item = function(index){
		return this.field[index]; 
	}; 
	
	this.addTupleDict = function(x, y, item){
		if(!this.field[x]){
			this.field[x] = {}; 
		}
		this.field[x][y] = item;
		item.event('change', this.change); 
	}; 
	
	this.getTupleDict = function(x, y){
		if(this.field[x] && this.field[x][y]){
			return this.field[x][y]; 
		}
		return null; 
	}; 
	
}; 
