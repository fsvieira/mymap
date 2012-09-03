function Event(names, args){
	this.names = names; 
	this.args = args; 
	this.done = []; 
}; 


function Model(args){
	
	if(args){
		this.parent = args.parent?args.parent:[]; 
		this.label = args.label?args.label:""; 
		this.father = args.father?args.father:null; 
		if(this.father){
			this.parent.push(this.father); 
		}; 
		this.field = args.value; 
		this.ui = args.ui; 
		this.desc = args.desc?args.desc:{}; 
	}else{
		this.parent = []; 
		this.label = ""; 
		this.father = null; 
	}
	this.children = [];
	
	this.fields = []; 
	
	
	this.events = {}; 
	
	this.event = function(event_name, func){
		if(!this.events[event_name]){
			this.events[event_name] = []; 
		}
		this.events[event_name].push(func); 
		return func; 
	}; 
	
	this.remove_event = function(event_name, func){
		i = this.events[event_name].indexOf(func); 
		this.events[event_name].splice(i, 1); 
	}; 
	
	this.trigger_event = function(event){
		
		if(!(this in event.done)){
			event.done.push(this); 
			
			for(i in event.names){
				if(event.names[i] in this.events){
					var e = this.events[event.names[i]]; 
					for(j in e){
						e[j](event); 
					}
				}
			}
			
	
						
			for(p in this.parent){
				this.parent[p].trigger_event(new Event(['change'], {'event': event, 'model' : this.parent[p]})); 
			}
			
		}
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

	this.setRelation = function(item){
		item.insertInList(this, item.parent); 
		this.insertInList(item, this.children); 
	}; 
	
	this.removeRelation = function(item){
		item.removeInList(this, item.parent); 
		this.removeInList(item, this.children);
	}; 
	
	this.getName = function(){
		return ""; 
	};

	this.mkField = function(args){
		args.father = this; 
		var n = new Model(args); 
		this[args.label] = n; 
		this.fields.push(n); 
		this.setRelation(n); 
	}; 

	this.insertInList = function(item, list){
		if(list.indexOf(item) == -1){
			list.push(item); 
			return true; 
		} 
		return false; 
	}; 

	this.insert = function(item){
		if(insertInList(item, this.field)){
			this.setRelation(item); 
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
			this.removeRelation(item); 
			this.trigger_event(new Event(['change', 'remove'], {'model':this, 'index': index}) ); 
		}
	}; 

	this.remove_index = function(index){
		item = this.field[index]; 
		this.field.splice(index, 1); 
		this.removeRelation(item); 
		this.trigger_event(new Event(['change', 'remove'], {'model':this, 'index': index}) ); 
	}; 

	
	this.add = function(item){
		this.field.push(item); 
		this.setRelation(item);  
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
		this.setRelation(item);  
	}; 
	
	this.getTupleDict = function(x, y){
		if(this.field[x] && this.field[x][y]){
			return this.field[x][y]; 
		}
		return null; 
	}; 
	
}; 
