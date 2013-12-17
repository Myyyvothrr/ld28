ig.module
(
    'game.entities.ressources-tree'
)
.requires
(
	'impact.entity',
    'impact.entity-pool',    
    'game.ressource-base'
)
.defines(function ()
{
    EntityRessourcesTree = RessourceBase.extend(
    {
        animSheet: new ig.AnimationSheet('media/ressources/tree.png', 16, 32),
        size: { x: 16, y: 32 },
        offset: { x: 0, y: 0 },
        zIndex: 31,

        health: 30,

        res_type: 'wood',
        res_amount: 2,

        sound_hit: new ig.Sound('media/sounds/tree_hit.*'),

        init: function (x, y, settings)
        {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

            this.reset(x, y, settings);
        },

        reset: function(x, y, settings)
        {
            this.parent(x, y, settings);
        },
    });

    ig.EntityPool.enableFor(EntityRessourcesTree);
});