ig.module
(
    'game.building-base'
)
.requires
(
	'impact.entity',
    'game.entities.buildings-dirt'
)
.defines(function ()
{
    BuildingBase = ig.Entity.extend(
    {
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        maxVel: { x: 0, y: 0 },
        health: 1,

        is_built: false,
        is_placed: false,
        building_status: 0,

        building_speed: 1,

        dirt_obj: 0,

        res_type: 0,

        wood_costs: 0,
        stone_costs: 0,
        water_costs: 0,

        sound_building: new ig.Sound('media/sounds/building.*'),
        music_building: new ig.Music(),

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.music_building.add(this.sound_building);
            this.music_building.loop = true;

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
            this.music_building.stop();
        },

        update: function ()
        {
            this.parent();

            this.music_building.pause();

            if (!this.is_built && this.is_placed)
            {
                if (this.building_status >= 100)
                {
                    this.building_finished();
                }
            }
        },

        draw: function()
        {
            if (this.is_built || !this.is_placed)
                this.parent();
        },

        check: function (other)
        {
            if (!this.is_built && this.is_placed && other instanceof EntityUnitsWorker)
            {
                this.building_status += this.building_speed;
                this.dirt_obj.working();
                this.music_building.play();
                other.is_building();
            }
        },

        receiveDamage: function(amount, from)
        {
        },

        kill: function()
        {
            this.parent();
        },

        building_placed: function()
        {
            this.dirt_obj = ig.game.spawnEntity(EntityBuildingsDirt, this.pos.x + this.size.x * 0.5 - 8, this.pos.y + this.size.y * 0.5 - 8);
            this.is_placed = true;
        },

        building_finished: function()
        {
            this.music_building.stop();
            ig.game.removeEntity(this.dirt_obj);
            ig.game.add_building(this.res_type);
            this.is_built = true;
        }
    });
});