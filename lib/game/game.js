ig.module
(
	'game.game'
)
.requires
(
    'impact.game',
    'impact.font',

    'game.button',

    'game.entities.buildings-well',
    'game.entities.buildings-treecutter',
    'game.entities.buildings-stonecutter',
    'game.entities.buildings-castle',

    'game.levels.map1'
)
.defines(function ()
{
    Game = ig.Game.extend(
    {
        font: new ig.Font('media/04b03.font.png'),

        bg_parchment: new ig.Image('media/parchment.png'),

        cursor: new ig.Image('media/cursor.png'),

        autoSort: true,
        sortBy: ig.Game.SORT.POS_Y,
        gravity: 0,

        TILE_SIZE: 16,

        buttons:
        {
            btn_deliver: new Button(224, 32, "DELIVER", "DELIVER THE GOODS\nTO YOUR KING.", 'king', 0),
            btn_build_well: new Button(446, 12, "WELL", "A WELL\n50 WOOD | 50 STONES | 0 WATER\nBUILD A WELL TO GET ACCESS WATER.\nBUILD MORE WELLS TO GET\nWATER FASTER.", 'build', EntityBuildingsWell),
            btn_build_wood: new Button(446, 28, "WOODCUTTER", "A WOODCUTTER HUT\n200 WOOD | 100 STONES | 50 WATER\nBUILD A WOODCUTTER HUT\nTO GET WOOD FASTER.", 'build', EntityBuildingsTreecutter),
            btn_build_stone: new Button(446, 44, "STONEMASON", "A STONEMASON HUT\n100 WOOD | 50 STONES | 50 WATER\nBUILD A STONEMASON HUT\nTO GET STONE FASTER.", 'build', EntityBuildingsStonecutter),
            btn_build_castle: new Button(446, 60, "CASTLE", "THE OLD CASTLE\n1000 WOOD | 1000 STONES | 1000 WATER\nREBUILD THE OLD CASTLE\nTO PLEASE THE KING.", 'build', EntityBuildingsCastle),
        },

        message_box: '',

        kings_message_id: '',
        kings_message: '',
        kings_message_active: false,
        kings_message_btn: new Button(224, 282, "ACCEPT", "", 'kings_message', 0),

        castle_built: false,
        castle_built_timer: 0,
      
        ressources:
        {
            wood: 0,
            stones: 0,
            water: 0,

            kings_favor: 100,
        },

        ressources_multiplier:
        {
            wood: 1,
            stones: 1,
            water: 0,
        },

        RESSOURCES_TYPES:
        [
            'wood',
            'stones',
            'water',
        ],

        RESSOURCES_NAMES:
        {
            wood: 'WOOD',
            stones: 'STONES',
            water: 'WATER'
        },

        is_building: false,
        building_obj: 0,

        king_demands_timer: 0,
        king_demands_ressources: 0,
        king_demands_ressources_type: '',

        init: function ()
        {
            this.loadLevel(LevelMap1);

            this.king_demands_timer = new ig.Timer(1);
            this.castle_built_timer = new ig.Timer(0);

            this.set_kings_message("LORD RAUTENSTEIN,\n\nTHE KING SENDS YOU TO REBUILD\nTHE OLD CASTLE IN THE VALLEY.\n\nYOU ALSO NEED TO DELIVER\nRESSOURCES TO HELP STRENGTHEN\nTHE KINGS REGIME.\n\nTIMES ARE HARD, SO YOU ONLY\nGET ONE WORKER.\n\nSTAY IN THE KINGS FAVOUR OR\nYOU WILL GET REPLACED.", 'start')
        },

        update: function ()
        {
            if (this.kings_message_active)
            {
                this.kings_message_btn.update();
                return
            }

            this.parent();

            this.screen.x = 0;
            this.screen.y = 0;

            if (this.castle_built && this.castle_built_timer.delta() >= 0)
            {
                this.set_kings_message("LORD RAUTENSTEIN,\n\nNEWS HAVE REACHED THE\nKING THE CASTLE HAS BEEN\nREBUILT.\n\nGOOD WORK. STAY IN THE\nVALLEY UNTIL FURTHER NOTICE.\n\nWE WILL SEND MORE WORKERS.\n\nCONGRATULATIONS!", 'gamewon');
                this.castle_built = false;
            }

                if (this.king_demands_timer.delta() > 0)
                    this.king_demands_timeup();

                if (this.is_building)
                {
                    this.building_obj.pos.x = Math.floor((ig.input.mouse.x + this.screen.x) / this.TILE_SIZE) * this.TILE_SIZE;
                    this.building_obj.pos.y = Math.floor((ig.input.mouse.y + this.screen.x) / this.TILE_SIZE) * this.TILE_SIZE;;

                    if (ig.input.pressed('click1'))
                    {
                        if (this.building_obj.wood_costs <= this.ressources.wood
                            && this.building_obj.stone_costs <= this.ressources.stones
                            && this.building_obj.water_costs <= this.ressources.water)
                        {
                            this.ressources.wood -= this.building_obj.wood_costs;
                            this.ressources.stones -= this.building_obj.stone_costs;
                            this.ressources.water -= this.building_obj.water_costs;
                        
                            this.building_obj.building_placed();
                        }
                        else
                        {
                            this.removeEntity(this.building_obj);
                        }

                        this.is_building = false;                    
                    }
                    else if (ig.input.pressed('click2'))
                    {
                        this.building_obj.kill();
                        this.is_building = false;
                    }

                    return;
                }

                this.message_box = '';

                for (var b in this.buttons)
                    this.buttons[b].update();
        },

        draw: function ()
        {
            this.parent();

            if (this.kings_message_active)
            {
                this.bg_parchment.draw(158, 64);

                this.font.draw("A MESSAGE FROM YOUR KING", 256, 106, ig.Font.ALIGN.CENTER);

                this.font.draw(this.kings_message, 186, 128, ig.Font.ALIGN.LEFT);

                this.kings_message_btn.draw();
            }

                this.font.draw("WOOD", 2, 2, ig.Font.ALIGN.LEFT);
                this.font.draw("STONES", 2, 12, ig.Font.ALIGN.LEFT);
                this.font.draw("WATER", 2, 22, ig.Font.ALIGN.LEFT);
                this.font.draw("KINGS", 2, 42, ig.Font.ALIGN.LEFT);
                this.font.draw("FAVOUR", 2, 52, ig.Font.ALIGN.LEFT);
                this.font.draw(this.ressources.wood, 66, 2, ig.Font.ALIGN.RIGHT);
                this.font.draw(this.ressources.stones, 66, 12, ig.Font.ALIGN.RIGHT);
                this.font.draw(this.ressources.water, 66, 22, ig.Font.ALIGN.RIGHT);
                this.font.draw(this.ressources.kings_favor, 66, 52, ig.Font.ALIGN.RIGHT);
                this.font.draw("(x" + this.ressources_multiplier.wood + ")", 68, 2, ig.Font.ALIGN.LEFT);
                this.font.draw("(x" + this.ressources_multiplier.stones + ")", 68, 12, ig.Font.ALIGN.LEFT);
                this.font.draw("(x" + this.ressources_multiplier.water + ")", 68, 22, ig.Font.ALIGN.LEFT);

                this.font.draw("THE KING DEMANDS", 256, 2, ig.Font.ALIGN.CENTER);
                if (this.king_demands_ressources > 0)
                {
                    this.font.draw(this.king_demands_ressources + " " + this.RESSOURCES_NAMES[this.king_demands_ressources_type], 256, 12, ig.Font.ALIGN.CENTER);
                    this.font.draw("IN " + (Math.floor(-1 * this.king_demands_timer.delta()) + 1) + " DAYS", 256, 22, ig.Font.ALIGN.CENTER);
                }
                else
                {
                    this.font.draw("NOTHING", 256, 12, ig.Font.ALIGN.CENTER);
                    this.font.draw("GOOD WORK!", 256, 22, ig.Font.ALIGN.CENTER);
                }

                this.font.draw("BUILD", 510, 2, ig.Font.ALIGN.RIGHT);

                if (this.message_box != '')
                    this.font.draw(this.message_box, 2, 332, ig.Font.ALIGN.LEFT);

                for (var b in this.buttons)
                    this.buttons[b].draw();
            

            this.cursor.draw(ig.input.mouse.x, ig.input.mouse.y);
        },

        king_demands_timeup: function()
        {
            if (this.king_demands_ressources != 0)
                this.ressources.kings_favor -= this.king_demands_ressources;

            this.king_demands_ressources = Math.floor(10 + Math.random() * 20);
            this.king_demands_ressources_type = this.RESSOURCES_TYPES[Math.floor(Math.random() * this.RESSOURCES_TYPES.length)];
            this.king_demands_timer.set(30 + Math.random() * 41);

            if (this.ressources.kings_favor < 0)
                this.set_kings_message("LORD RAUTENSTEIN,\n\nTHE KING IS FURIOUS.\n\nYOU FAILED TO DELIVER.\n\nRETURN IMMEDIATELY.", 'gameover');
        },

        king_demands_fullfilled: function()
        {
            this.king_demands_ressources = 0;
            this.king_demands_timer.set(10 + Math.random() * 21);
        },

        button_clicked: function(id, user_data)
        {
            if (id == 'king')
            {
                if (this.king_demands_ressources > 0)
                {
                    if (this.ressources[this.king_demands_ressources_type] >= this.king_demands_ressources)
                    {
                        this.ressources[this.king_demands_ressources_type] -= this.king_demands_ressources;
                        this.ressources.kings_favor += this.king_demands_ressources;
                        this.king_demands_fullfilled();
                    }
                }
            }
            else if (id == 'build')
            {
                this.build_start(user_data);
            }
            else if (id == 'kings_message')
            {
                this.kings_message_active = false;
                ig.Timer.timeScale = 1;

                if (this.kings_message_id == 'start')
                {                  
                }
                else if (this.kings_message_id == 'gamewon')
                {                    
                    ig.system.setGame(Gameover);
                }
                else if (this.kings_message_id == 'gameover')
                {                    
                    ig.system.setGame(Gameover);
                }
            }
        },

        build_start: function (building)
        {
            this.is_building = true;
            this.building_obj = this.spawnEntity(building, 0, 0);
        },

        set_message: function(text)
        {
            this.message_box = text;
        },

        set_kings_message: function(text, id)
        {
            this.kings_message_id = id;
            this.kings_message = text;
            this.kings_message_active = true;
            ig.Timer.timeScale = 0;
        },

        add_resources: function(res_type, amount)
        {
            this.ressources[res_type] += amount * this.ressources_multiplier[res_type];
        },

        add_building: function(res_type)
        {
            if (res_type != 0)
            {
                if (res_type == 'castle')
                {
                    this.castle_built = true;
                    this.castle_built_timer.set(5);
                }
                else
                    this.ressources_multiplier[res_type] += 1;
            }
        },

        get_tile_pos: function(x, y)
        {
            return { 
                x: Math.floor((x + this.screen.x) / this.TILE_SIZE),
                y: Math.floor((y + this.screen.y) / this.TILE_SIZE)
            };
        },

        get_pos: function(x, y)
        {
            return { 
                x: x + this.screen.x,
                y: y + this.screen.y
            };
        },
    });
});