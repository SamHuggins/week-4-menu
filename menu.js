class Villager {
    constructor(name, job, mood){
        this.name = name;
        this.job = job;
        this.mood = mood;
    }
    describe(){
        return`${this.name} is a ${this.job} and feels ${this.mood}.`
    }
}


class Town{
    constructor(name){
        this.name = name
        this.villagers = []; //an array that stores all of the villagers in a town
    }
    addVillager(villager){
        if (villager instanceof Villager) {
            this.villagers.push(villager);    
        } else {
            throw new Error(`You can only add an instance of Villager. Argument is not a villager: ${villager}`);
        }
    }

    describe(){
        return`${this.name} has ${this.villagers.length} townsfolk.`;
    }
}

class Menu {
    constructor(){
        this.towns = [];
        this.selectedTown = null
    }

    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTown();
                    break;
                case '2':
                    this.viewTown();
                    break;
                case '3':
                    this.deleteTown();
                    break;
                case '4':
                    this.displayTowns();
                    break;
                default:
                    selection = 0;    
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    showVillagerMenuOptions(villagerInfo){
        return prompt(`
        0) back
        1) create villager
        2) delete villager
        ----------------------
        ${villagerInfo}`)
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new town
            2) view town
            3) delete town
            4) display all towns
        `)
    }

    displayTowns(){
        let townString = '';
        for (let i = 0; i < this.towns.length; i++) {
            townString += i + ') ' + this.towns[i].name + '\n';
        }
        alert(townString);
    }

    createTown() {
        let name = prompt('Enter a name for your new town:');
        this.towns.push(new Town(name));
    }

    viewTown() {
        let index = prompt('Enter the index of the town you wish to view:');
        if (index > -1 && index < this.towns.length) {
            this.selectedTown = this.towns[index];
            let description = 'The town of ' + this.selectedTown.name + '\n';

            for (let i = 0; i < this.selectedTown.villagers.length; i++) {
                description += i + ') ' + this.selectedTown.villagers[i].name + ' - ' + this.selectedTown.villagers[i].job + ' - ' + this.selectedTown.villagers[i].mood + '\n';
            }
            let selection = this.showVillagerMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createVillager();
                    break
                case '2':
                    this.deleteVillager();
            }
        }    
    }

    deleteTown(){
        let index = prompt('Enter the index of the town you wish to delete: ')
        if (index > -1 && index <this.towns.length){
            this.towns.splice(index, 1);
        }
    }

    createVillager(){
        let name = prompt('Enter name for the new villager: ');
        let job = prompt('Enter a new job for the new villager: ');
        let mood = prompt('Enter a new mood for the new villager: ');
        this.selectedTown.villagers.push(new Villager(name, job, mood));
    }

    deleteVillager() {
        let index = prompt('Enter the index of the player you wish to delete: ');
        if(index > -1 && index < this.selectedTown.villagers.length) {
            this.selectedTown.villagers.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();