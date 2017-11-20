const mongoose = require('mongoose');
const bcrypt  = require("bcrypt");
const bcryptSalt = 10;
const User = require('../models/User');
const Group = require('../models/Group');
const Recipe = require('../models/Recipe');

//VEGGIE

const repices = [
  {
    name: 'Peanut Butter Blossoms',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/peanut-butter-blossoms-5aea9e.jpg?h=500&w=500',
    duration: '30 min',
    level: 3,
    points: 30,
    ingredients: [
    '1 1/2 cups Unbleached all-purpose flour',
		'1 teaspoon Baking soda',
		'1/2 teaspoon Salt',
		'1/2 cup unsalted butter; (1-stick), softened',
		'3/4 cup creamy peanut butter; (I use Jif)',
		'1/3 cup Granulated sugar',
		'1/3 cup light brown sugar; firmly packed',
		'1 large Egg',
		'2 tablespoons milk',
		'1 teaspoon Vanilla extract',
		'48 Hersheys chocolate kisses; unwrapped',
    ],
    preparation: `Adjust oven rack to middle position and heat oven to 375 degrees F.Remove wrappers from chocolates; set aside. Place about 1/2 cup  sugar (for rolling) in an 8-inch cake pan or shallow dish, set aside. In a  medium bowl, sift together flour, baking soda and salt; set aside. In a large bowl, beat butter and peanut butter until well blended. Beat in granulated and brown sugars until light and fluffy. Add egg, milk and vanilla, and beat until well blended. Gradually mix reserved dry ingredients into the wet ingredients. Using a tablespoon measure or cookie scoop, portion out dough and shape into balls about 1-inch in diameter. Drop balls into pan with sugar and shake (about 4 balls at a time) to roll balls in sugar to coat. Place balls about 2-inches apart, in staggered rows of 3-2-3-2-3, on a large ungreased cookie sheet. Place one baking sheet at a time onto center rack of preheated 375 degree F oven. Bake until just starting to turn light golden brown, about 8 to 10 minutes, rotating baking sheet if needed for even baking. Do not over-bake. Remove from the oven and immediately place one chocolate kiss onto the center of each cookie, pressing down firmly (cookie will crack slightly around edges). Transfer cookies to a wire rack to cool completely. Store cookies in an airtight container at room temperature for up to 1 week. Cookies freeze well. Makes about 48 cookies.` ,
    price: 50,
  },
  {
    name: 'Coconut tapioca with sweet rice balls',
    foodProfile:  'veggie',
    imgUrl: 'http://thewoksoflife.com/wp-content/uploads/2017/01/coconut-tapioca-dessert-8.jpg',
    duration: '60 min',
    level: 4,
    points: 70,
    ingredients: [
    '1 can coconut milk (13.5 ounces)',
    '1 1/2 cups milk',
    '1/4 cup to 1/2 cup sweetened condensed milk',
    '1/2 teaspoon vanilla extract',
    '1/2 cup sweet rice flour (140 grams)',
    'water',
    '1/2 cup mini pearl tapioca (90 grams)',
    '1/2 cup fresh strawberries; sliced (or fresh fruit of your choice)',
    '1/2 cup fresh blueberries (or fresh fruit of your choice)',
    ],
    preparation: `Add the coconut milk, milk, sweetened condensed milk, and vanilla
     extract to a small pot. Stir and bring to a boil—watch it closely so the liquid
     doesn’t boil over. Once it boils, immediately take it off the heat. Let the
     mixture cool slightly, and put it in the refrigerator to chill. This step
     can be done ahead of time!
     Time to make the mini sticky rice balls. Mix the sweet rice flour with ¼ cup
     of water in a bowl using your hands. Then add ½ teaspoon water at a time until
     the dough turns into a play-doh-like consistency—not too wet but pliable. If
     the dough falls apart as you roll it in between your palms, it’s too dry, but
     if the dough gets wetter as you roll it in between your palms, it’s too wet.
     Next, take a small piece—about 3 grams if you have a scale—and roll it into a
     small ball. Place it on a piece of parchment or clear plastic wrap. Repeat
     until you’ve used all the dough. Cover with plastic wrap and put the sweet
     rice balls in the refrigerator while you prepare the rest of the dessert.
     In a pot, bring 4 cups of water to a boil. Add the mini pearl tapioca (don’t
     add it before the water is at a full boil!). Stir and bring it to boil again.
     Turn off the heat, cover it with a lid, and set your timer for 18 minutes.
     After 18 minutes have elapsed, the pearl tapioca should turn completely
     transparent, which means they’re fully cooked. Strain the pearls, rinse them
     with cold water to prevent them from sticking, and set aside.
     In the same pot, bring another 4 cups of water to a boil, and add the sweet
     rice balls. Stir and let them cook for a few minutes over high heat. When
     they float to the top, they’re done. Strain and rinse them with cold water
     to prevent sticking.
     Divide the prepared coconut milk soup into 4 bowls, then divide and add in
     the cooked sweet rice balls and pearl tapioca. Top with your fresh fruit of
     choice and serve!`,
    price: 100,
  },
  {
    name: 'My Favorite Christmas Dessert',
    foodProfile:  'veggie',
    imgUrl: 'https://i2.wp.com/ridgelysradar.com/wp-content/uploads/2013/12/peppermint1.jpg',
    duration: '60 min',
    level: 4,
    points: 70,
    ingredients: [
    '2cartons Edys Limited Edition Peppermint Ice Cream',
    '3 Oreo pie crusts',
    '1 bottle Hersheys Special Dark Chocolate Syrup',
    '1 jar Crushed Peppermint or Candy Canes that you crush in a Ziplock with a rolling pin',
    ],
    preparation: `Scoop the ice cream into pie crust(s)
    Take a sheet of parchment paper, big enough to cover the pie, and place over the
    ice cream
    Using a rolling pin, on top of the parchment paper, roll the ice cream so that it
    is smooth, flat and even with the pie crust. You can leave the paper or remove
    carefully and cover with the plastic lid from the Oreo pie crust container. When
    I make several pies, I use the parchment paper as the cover and I stack the pies
    in my freezer. It takes up less room than when covered with the plastic lids.
    Put the pie(s) in the freezer until ready to serve
    When it is time to serve the pie(s), remove from the freezer and take off the
    lid or parchment paper. Cut in desired portions and plate each piece.
    Dribble the syrup in a zigzag pattern over the plated pie wedges. Scatter the
    crushed peppermint or candy canes.Serve immediately`,
    price: 100,
  },
  {
    name: 'Pumpkin Cheesecake Pie',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/pumpkin-cheesecake-pie-2615a8.jpg?h=500&w=500',
    duration: '60 min',
    level: 4,
    points: 70,
    ingredients: [
    '1 pastry for single-crust pie; partially baked',
    '1 8-oz package full-fat cream cheese; room temperature',
    '1/2 cup Granulated sugar',
    '1/2 cup light brown sugar; firmly packed',
    '2 large Eggs',
    '1 large Egg yolk',
    '1/2 teaspoon Vanilla extract',
    'lemon zest; one of one lemon, finely grated',
    '1/2 teaspoon Ground cinnamon',
    '1/2 teaspoon Ground nutmeg',
    '1/2 teaspoon Ground ginger',
    '1/4 teaspoon Salt',
    '1 cup Canned pumpkin',
    '2/3 cup Half-and-half',
    ],
    preparation: `Prepare, bake, and cool the pie crust.
    Heat oven to 350 degrees (F). With an electric mixer or food processor,
    beat cream cheese until smooth. Add sugars and blend until smooth.
    Then add whole eggs and yolk, vanilla, lemon zest, cinnamon, nutmeg,
    ginger, salt, pumpkin and half-and-half. Blend until smooth and evenly mixed.
    Pour the filling into the pie shell.
    Place pie pan on center oven rack and bake 25 minutes. Rotate pan 180 degrees and
    continue baking 20 minutes, or until the top has puffed slightly. The center may
    still be a little wobbly, but it should not be soupy. Transfer pie to cooling
    rack and let cool to room temperature. Cover loosely tented with aluminum foil
    and refrigerate at least 4 hours or overnight before serving. Makes 10 servings.`,
    price: 100,
  },
  {
    name: 'Red and Green Magic Bars',
    foodProfile:  'veggie',
    imgUrl: 'http://hungryhappenings.com/wp-content/uploads/2013/12/Christmas-magic-bars-dessert-recipe-Oreoss.jpg',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    '30 Original Oreo Cookies; crushed into fine crumbs'
    '1/2 cup (1 stick) unsalted butter; melted'
    '1 (14 ounce) can sweetened condensed milk'
    '1/2 cup Heath toffee bits'
    '1/3 cup salted and roasted peanuts'
    '1/2 cup pretzels broken into small pieces'
    '16 Winter Oreo Cookies with Red Vanilla Filling; broken into small pieces'
    '1 cup red and green M&Ms'
    '1 bag Nestle Holiday Semi-Sweet Chocolate Morsels with Rf'
    ],
    preparation: `Preheat oven to 350 degrees Fahrenheit.
    Line a 9x13 baking pan with non-stick aluminum foil.
    Mix crushed Original Oreo Cookies with melted butter.
    Press into and even layer in the 9x13 baking pan.
    Sprinkle on toffee bits, peanuts, and pretzels.
    Pour sweetened condensed milk over top and spread evenly.
    Add the pieces of red cream filled Oreos cookies, 1/2 cup of the red and
    green M&M's and 1/2 of the bag of Holiday morsels.
    Bake for 25-27 minutes until the sweetened condensed milk has caramelized.
    Remove from oven and sprinkle on the remaining red and green M&M's and
    Holiday Chocolate Morsels.
    Return to oven for 3 minutes.
    Remove pan from oven, and tap it on the counter a few times. This will
    help secure all the M&M's.
    Cool completely. Peel off foil. Cut into 24-30 squares. Store in an airtight
    container for up to a week.`,
    price: 50,
  },
  {
    name: 'Dutch Apple Pie',
    foodProfile:  'veggie',
    imgUrl: 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/7/8/0/FN_Dutch-Apple-Pie_s4x3.jpg.rend.hgtvcom.616.462.suffix/1437083208434.jpeg',
    duration: '120 min',
    level: 5,
    points: 100,
    ingredients: [
    '6 cups apples; sliced',
    '1 cup Sugar',
    '0.75 tsp cinnamon',
    '0.75 cup Flour',
    '0.75 stick Margarine; melted',
    '0.5 cup cheddar cheese; grated',
    '9 tbsp Sugar',
    ],
    preparation: `Mix ingredients for pie filling together & cook over low heat
    until juice forms and fruit is tender. Cool slightly and pour into unbaked pie
    shell (9"). Mix ingredients for topping. Cover pie with topping and bake 45
    minutes 375.`,
    price: 100,
  },
  {
    name: 'Mousse dressert',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/quick-christmas-dessert-1869368.jpg?h=500&w=500',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    'Gingerbread (thinner) 1 pack',
    'lingonberry jam 200 g',
    'sugar 3 tbsp.',
    'Tere sour cream 20% 500 g',
    'vanilla sugar 1 tsp.',
    ],
    preparation: `Crumble in the hands cookies. Some pieces may remain big.
    Gingerbread (thinner) 1 pack. Add the sour cream, sugar and vanilla sugar.
    All mix together. Tere sour cream 20% 500 g, sugar 3 tbsp., vanilla sugar 1 tsp.
    Transfer with the
    soup spoon mixture into serving bowls. Top up with lingonberry jam. Repeat the
    layers until glass is full.`,
    price: 50,
  },
  {
    name: 'Nutella Cupcakes',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/nutella-cakes-25bdcd4acd5b1d0f69f9e9e1.jpg?h=500&w=500',
    duration: '45min',
    level: 3,
    points: 50,
    ingredients: [
    '397 gram condensed milk',
    '150 gram self-raising flour',
    'pinch of salt',
    '3 eggs',
    '1 tsp vanilla extract',
    '100 gram dark chocolate',
    '1 tsp butter',
    '200 gram soft butter',
    '200 gram powdered sugar',
    '200 gram Nutella',
    'pinch of salt',
    '3 tbsp cream or milk',
    ],
    preparation: `Cover a square bakingform with bakingpaper and preheat the
    oven to 180° celsius.
    FOR THE CAKE: Melt the chocolate au bain marie together with the butter.
    Put the ingredients for the cake including the melted chocolate in a bowl and
     mix it for 5 minutes.
    Pour the mixture in to the bakingform and bake it in the preheated oven for
    40 minutes or until done.
    FOR THE FROSTING:
    Mix the butter until fluffy, add the powdered sugar little by little. Add the
    rest and mix until you have a good and fluffy frosting.
    Decorate the cakes to your own liking.`,
    price: 50,
  },
  {
    name: 'Mousse vanilla',
    foodProfile:  'veggie',
    imgUrl: 'https://cdn2.tmbi.com/TOH/Images/Photos/37/300x300/Eggnog-Trifle_exps7631_W101973175A05_04_3b_RMS.jpg',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '3/4 cup cold milk',
    '1 package (3.4 ounces) instant vanilla pudding mix',
    '2 cups eggnog',
    '1/2 teaspoon almond extract',
    '1-1/2 cups heavy whipping cream; whipped, divided',
    '1 loaf-shaped angel food cake (10-1/2 ounces) or sponge cake',
    '1 cup raspberry jam or preserves',
    '2 tablespoons confectioners sugar',
    '1/2 teaspoon vanilla extract',
    'Maraschino cherry halves',
    ],
    preparation: `In a mixing bowl, beat milk and pudding mix until blended.
    Gradually add eggnog; mix well. Fold in extract and 1 cup of whipped cream;
    set aside. Slice cake into 1/2-in. pieces; place a fourth in a 2-qt.
    serving bowl. Top with 1/3 cup jam. Spoon 1 cup of eggnog mixture over all.
    Repeat two more layers of cake, jam, and eggnog mixture. Cover and chill for
    at least 2 hours. Fold sugar and vanilla into remaining whipped cream;
    spoon on top of trifle. Garnish with cherries. Yield: 8-10 servings.`,
    price: 50,
  },
  {
    name: 'Pumkcake cinnamon',
    foodProfile:  'veggie',
    imgUrl: 'http://www.bakedbyanintrovert.com/wp-content/uploads/2016/11/Eggnog-Cake-pic.jpg',
    duration: '80 min',
    level: 5,
    points: 70,
    ingredients: [
    '3 cups all-purpose flour',
    '1 teaspoon salt',
    '1 teaspoon baking powder',
    '1 teaspoon ground cinnamon',
    '1/2 teaspoon baking soda',
    '1/2 teaspoon ground nutmeg',
    '1 cup unsalted butter softened',
    '1 and 3/4 cups granulated sugar',
    '3 large eggs',
    '2 large egg yolks',
    '1/4 cup spiced rum',
    '2 teaspoons vanilla extract',
    '3/4 cup buttermilk',
    'For the glaze',
    '2 cups confectioners sugar',
    '3-4 tablespoons spiced rum',
    ],
    preparation: `Adjust the oven rack to the lower third position and heat to
    350°F. Grease and flour a 12-cup bundt pan. Set aside.
    In a medium bowl, combine the flour, salt, baking powder, cinnamon, baking
    soda, and nutmeg. Whisk until well combined. Set aside.
    Using a stand mixer fitted with the paddle attachment and hand-held electric
    mixer, beat the butter and sugar on medium-high speed until light and fluffy,
    about 3 minutes. Beat in the eggs and egg yolks, one at a time, mixing well
    after each addition. Add the rum and vanilla and beat until well combined.
    Reduce the speed to low and add half the flour mixture. Mix just until barely
    incorporated. Add the buttermilk and mix until incorporated. Add the remaining
    flour mixture and mix just until fully blended. Scrape down the sides of the
    bowl as needed.
    Transfer the batter to the prepared bundt pan and gently tap on the counter to
    remove any air bubbles. Bake for 50 to 60 minutes or until a toothpick inserted
    into the center comes out with only a few dry crumbs. Cool the cake in the pan on
    a wire rack for 10 minutes. Remove the cake from the pan and cool completely, about 2 hours.
    Make the glaze
    Whisk the confectioners' sugar and rum together in a bowl until smooth. Pour over
    cooled cake and let the cake sit for 30 minutes, until the glaze hardens. Slice and serve.
    Make ahead tip
    Bake the cake up to 2 days in advance. Wrap the cooled cake tightly with plastic
    wrap and store at room temperature until ready to use..`,
    price: 100,
  },
  {
    name: 'White chocolate snowball and strawberry',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/white-chocolate-snowball-and-strawberry-trifle-1804118.jpg?h=500&w=500',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '2 pkt strawberry jelly crystals',
    '500 g strawberries; hulled, halved',
    '215 g (1 cup) caster sugar',
    '100 g butter; melted',
    '2 eggs',
    '115 g (3/4 cup) plain flour',
    '45 g (1/2 cup) desiccated coconut',
    '120 g macadamias; coarsely chopped',
    '100 g white chocolate; coarsely chopped',
    '2 tbs milk',
    '2 tbs Frangelico liqueur',
    '160 g (1/2 cup) strawberry jam',
    '4 pkt Lindt Lindor White Chocolate Balls',
    '180 pkt white chocolate; at room temperature',
    'Icing sugar; to dust',
    '(((White chocolate cream)))',
    '200 g white cooking chocolate; finely chopped',
    '500 ml (2 cups) thickened cream',
    '2 x 250g ctn mascarpone',
    ],
    preparation: `Make the jelly following packet directions. Pour into a 20cm
    (3.75L) straight-sided trifle bowl. Add 300g of the strawberries. Place in
    the fridge for 4 hours to set.
    Preheat oven to 180C/160C fan forced. Line a 22cm (base measurement) round
    springform pan with non-stick baking paper.
    Place the sugar and melted butter in a large bowl. Add the eggs, 1 at a time,
    and stir until mixture is thick and glossy. Stir in flour, coconut, macadamia,
    white chocolate and milk. Pour into prepared pan and smooth the surface. Bake
    for 30 minutes or until a skewer inserted into the centre comes out clean. Set
    aside in pan to cool completely.
    To make white chocolate cream, place the chocolate and 250ml (1 cup) of the
    cream in a saucepan. Stir for 5 minutes over low heat or until chocolate melts.
    Set aside for 10 minutes to cool slightly. Combine chocolate mixture, mascarpone
    and remaining cream in a bowl. Use electric beaters to whisk until firm peaks form
    (do not overbeat).
    Use a large serrated knife to trim cake edge to fit into trifle bowl. Gently place
    the cake into bowl. Drizzle with the Frangelico. Spread the jam over the cake. Line
    the remaining strawberries around the edge of the bowl to decorate. Fill with the
    white chocolate cream. Top with Lindt balls. Place in fridge for 4 hours to chill.
    Use a peeler to scrape sides of white chocolate to create curls. Arrange on top
    of trifle. Dust with icing sugar`,
    price: 50,
  },
  {
    name: 'cake pop ice-cream ',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/white-chocolate-and-cake-pop-i-b16822-6756040fc015a0f30be81030.jpg?h=500&w=500',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    '440 packet golden buttercake cake mix',
    'Rose pink gel food colouring',
    'Leaf green gel food colouring',
    'Golden yellow gel food colouring',
    '250 packet butternut snap cookies',
    '60 g butter; melted, cooled',
    '1 cup NESTLE White CHOC BITS',
    '2 litres vanilla ice-cream',
    '2 teaspoons coconut essence',
    '1 1/2 x 375g packets NESTLE White Melts',
    ],
    preparation: `Preheat oven to 180C/160C fan-forced. Grease 24 holes of 2 x 18-hole
    cake pop pans. Make cake following packet directions. Divide batter evenly
    between 3 bowls. Tint 1 portion pink, 1 portion green and remaining portion
    yellow. Spoon heaped tablespoons batter into each hole of pans. Place lids
    on pans and secure. Bake for 15 minutes. Stand for 5 minutes. Carefully
    remove lids. Turn cake pops onto a baking paper-lined wire rack to cool completely.
    Grease a 9cm-deep, 11.5cm x 20cm (base) loaf pan. Line base and sides with
    baking paper, extending paper 2cm above edges of pan. Process cookies until
    fine crumbs. Add butter. Process until combined. Add CHOC BITS. Process until
    roughly chopped. Press half the mixture over the base of prepared pan.
    Place ice-cream in a bowl. Set aside for 10 minutes to soften (don’t allow
    ice-cream to melt completely). Stir in coconut essence. Working quickly,
    spoon half the ice-cream over base. Level top. Push 12 pops down into the
    ice-cream, alternating colours. Dollop with remaining ice-cream, making
    sure it goes around pops. Level top. Top with remaining biscuit mixture,
    pressing to secure. Cover. Freeze overnight.
    Place 1/4 cup of melts in a heatproof, microwave-safe bowl. Microwave on
    MEDIUM (50%) for 1 minute, stirring every 30 seconds with a metal spoon, or
    until smooth. Dip 2cm of 1 end of each lollipop stick into melted chocolate.
    Push 1 stick into each remaining pop. Place on a tray lined with baking paper.
    Freeze for 20 minutes or until firm.
    Place 1/3 remaining melts in a heatproof, microwave-safe mug. Microwave on
    MEDIUM (50%) for 1 to 2 minutes, stirring every 30 seconds with a metal spoon,
    or until smooth. Dip 1 cake into melted chocolate. Rock backwards and forwards
    until cake is fully coated (don’t rotate stick or stir chocolate as this can
    cause crumbs to break off into the chocolate). Gently tap the stick on the
    side of the mug to drain excess chocolate and remove any air bubbles.
    Working quickly, sprinkle pops with sprinkles. Push stick into polystyrene.
    Repeat process with remaining cakes and sprinkles, melting remaining melts,
    as needed, in a clean mug. Stand for 10 minutes or until set.
    Remove ice-cream from freezer. Stand for 3 to 5 minutes to soften slightly.
    Turn cake onto serving plate. Remove the baking paper.
    Decorate top with cake pops. Serve.`,
    price: 50,
  },
  {
    name: 'Bûche Noël',
    foodProfile:  'veggie',
    imgUrl: 'https://images-gmi-pmc.edge-generalmills.com/74f81878-4d40-44cf-9097-041a4438ec99.jpg',
    duration: '50 min',
    level: 4,
    points: 70,
    ingredients: [
    '1 cup Flour',
    '3 whole Egg',
    '2 Egg yolks',
    '1/4 cup Butter',
    '1 pinch Salt',
    '2/3 cup Granulated sugar',
    '4 Egg yolks',
    '9 tablespoons Granulated sugar',
    '1/3 cup Water',
    '1 cup Unsalted butter',
    '1/2 cup sugar',
    '1/3 cup water',
    ],
    preparation: `Preheat oven to 425F
    Grease a baking sheet and line with wax paper. Butter and flour wax paper.
    Sift flour with salt. Melt butter: cool. Beat whole eggs, yolks, and sugar in
    a large bowl until combined. Beat at high speed 8 to 10 minutes until light and
    thick enough to leave a ribbon trail. Sift flour over batter a third at a time,
    folding in each third as lightly as possible. Just after the last addition, add
    melted butter and fold in both together. Spread batter evenly on prepared baking
    sheet to a 15" x 10" rectangle. Bake 8 to 10 minutes until edges are browned slightly.
    DO NOT OVER BAKE or cake will crack when rolled. Slide cake off baking sheet onto
    a rack by gently pulling paper with cake on top. Invert cake onto a cloth towel;
    remove paper. Roll up hot cake with towel and let cool.
    Prepare sugar syrup:
    Bring sugar and water to a boil in a small saucepan. Boil 1 to 2 minutes, or until clear. Cool.
    When the cake is cool, unroll gently and brush with cooled syrup.
    Butter Cream:
    In a medium bowl, beat egg yolks just until mixed. In a small heavy saucepan,
    heat sugar with water until dissolved, then bring to a boil until syrup reaches
    soft ball stage (239F on a candy thermometer). Wait 20 seconds until bubbles in syrup
    in saucepan subside. Gradually pour the hot sugar syrup over egg yolks beating
    constantly. If using an electric mixer, pour sugar syrup in a thin stream between
    beaters and bowl so syrup doesn't stick to either. Then beat as fast as possible
    until mixture is thick and cool. Cream butter and gradually beat it into yolk
    mixture which must be quite cool or it will melt the butter when you beat it in.
    Beat in a flavor appropriate for for chosen recipe. Butter cream can be prepared
    3 days ahead, then covered and refrigerated.
    (Chocolate Butter Cream: For every cup of butter cream add 3 ounces semi sweet
    chocolate which has been melted over a pan of boiling water. Cool slightly before
    beating into butter cream)
    Spread butter cream on the inside part of the cake. Trim edges with a sharp knife.
    Roll cake trimmings into tight spirals to be attached to exterior of log as knots
    with a little butter cream. Roll up cake, removing towel as you roll. Spread butter
    cream on outside of cake from end to end and mark it with a fork to resemble the bark.
    Sprinkle powdered sugar over the cake and grate a little chocolate over the sugar if
    desired or decorate as desired.
    Refrigerate until ready to serve. Bûche de Noël can be covered and refrigerated 1 to
    2 days. Makes 6 to 8 servings.`,
    price: 50,
  },
  {
    name: 'Caramel Pecan Pie',
    foodProfile:  'veggie',
    imgUrl: 'http://img.taste.com.au/2-mpfvlR/w720-h480-cfill-q80/taste/2016/11/caramel-pecan-pie-44228-1.jpeg',
    duration: '35 min',
    level: 3,
    points: 50,
    ingredients: [
    '1 x 220g pkt frozen Pampas Sweet Flan Case',
    '1 x 395g can sweetened condensed milk',
    '60g (1/3 cup, lightly packed) brown sugar',
    '2 eggs',
    '1 teaspoon vanilla extract',
    '100g pecans, coarsely chopped',
    ],
    preparation: `Preheat oven to 170°C. Place the flan case on a baking tray.
    Whisk together the condensed milk, sugar, eggs and vanilla in a bowl.
    Sprinkle the pecans over the pastry case. Pour in the egg mixture.
    Bake for 30-35 minutes, covering with foil if necessary to prevent overbrowning,
    or until filling is set and golden. Set aside for 10 minutes or until firm.
    Serve warm or at room temperature.`,
    price: 50,
  },
  {
    name: 'Cranberry Christmas Cake',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/cranberry-christmas-cake-2058637.jpg?h=500&w=500',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    '3 eggs',
    '2 cups sugar',
    '3/4 cup butter; softened',
    '1 teaspoon vanilla',
    '2 cups all-purpose flour (see note below for gluten-free',
    '12 oz fresh cranberries',
    ],
    preparation: `Preheat oven to 350 degrees. With a mixer, beat the eggs with
    the sugar until slightly thickened and light in color, about 5-7 minutes.
    The mixture should almost double in size. The eggs work as your leavening
    agent in this recipe, so do not skip this step. This mixture should form a
    ribbon when you lift the beaters out of the bowl. Add the butter and vanilla;
    mix two more minutes. Stir in the flour until just combined. Add the cranberries
    and stir to mix throughout.
    Spread in a buttered 9x13 pan. ( This pan is my favorite!) Bake for 40-50 minutes,
    or until very lightly browned and a toothpick inserted near the center of the cake
    comes out clean. (I baked mine for 43 minutes.) Let cool completely before cutting
    into small slices. I cut mine into fairly small pieces, about 1"x2", so that they
    could be easily eaten at a party. Enjoy!`,
    price: 50,
  },
  {
    name: 'Italian Cream Cake',
    foodProfile:  'veggie',
    imgUrl: 'https://photos.bigoven.com/recipe/hero/decadentitaliancreamcake-f210a0.jpg?h=500&w=500',
    duration: '60 min',
    level: 4,
    points: 70,
    ingredients: [
    '1/2 cups Butter Room Temperature; No Substitutes',
    '1/2 cups Good Shortening',
    '2 cups Sugar',
    '5 Large Eggs Separated',
    '1 cup Buttermilk',
    '1 teaspoon Good Vanilla',
    '2 cups All-purpose Flour',
    '1 teaspoon Baking Soda',
    '1 teaspoon Salt',
    '1 cup Shredded Or Flaked Sweetened Coconut',
    '1 cup Chopped Pecans',
    '1 stick Butter Softened',
    '1 package Cream Cheese (8 0z.); Softened',
    '1 teaspoon Good Vanilla',
    '1 pound Powdered Sugar',
    'Chopped Pecans For Garnish',
    ],
    preparation: `Cream butter, shortening and sugar in a large mixing bowl with electric mixer. Add egg yolks, one at a time, mixing well after each. Add buttermilk and mix well; add vanilla.
    Sift flour, baking soda and salt together in a medium bowl; add coconut and pecans and toss together well, then stir into wet ingredients. Mix well by hand.
    In another bowl, beat egg whites until stiff. Fold gently into cake batter, then divide batter into 3 greased and floured (9-inch) round cake pans.
    Bake 20-25 minutes at 325 F, or until lightly browned and cake tests done when a toothpick is inserted near the center. Cool thoroughly on wire racks in pans.
    While layers are cooling, prepare frosting. Cream butter and cream cheese together in a medium bowl; add vanilla, and gradually add powdered sugar, beating until smooth.
    Carefully remove cakes from pans and brush off crumbs. Place bottom layer on serving plate, top with frosting. Place second layer over first, top with frosting, then place the last layer. Frost the cake, then sprinkle with chopped pecans as desired. You can cheat and make this with a white cake mix, but it’s just not the same.
    Keep cake refrigerated.`,
    price: 100,
  },
  {
    name: 'Chocolate Brownies Tree',
    foodProfile:  'veggie',
    imgUrl: 'http://onelittleproject.com/wp-content/uploads/2015/11/DSC_9950.jpg',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    '185g unsalted butter',
    '185g best dark chocolate',
    '85g plain flour',
    '40g cocoa powder',
    '50g white chocolate',
    '50g milk chocolate',
    '3 large eggs',
    '275g golden caster sugar',
    ],
    preparation: `Cut 185g unsalted butter into small cubes and tip into a medium
    bowl. Break 185g dark chocolate into small pieces and drop into the bowl.
    Fill a small saucepan about a quarter full with hot water, then sit the bowl
    on top so it rests on the rim of the pan, not touching the water. Put over a
    low heat until the butter and chocolate have melted, stirring occasionally to
    mix them. Remove the bowl from the pan. Alternatively, cover the bowl loosely
    with cling film and put in the microwave for 2 minutes on High. Leave the melted
    mixture to cool to room temperature.
    While you wait for the chocolate to cool, position a shelf in the middle of your
    oven and turn the oven on to fan 160C/conventional 180C/gas 4.
    Using a shallow 20cm square tin, cut out a square of non-stick baking parchment
    to line the base. Tip 85g plain flour and 40g cocoa powder into a sieve held
    over a medium bowl. Tap and shake the sieve so they run through together and you
    get rid of any lumps.
    Chop 50g white chocolate and 50g milk chocolate into chunks on a board.
    Break 3 large eggs into a large bowl and tip in 275g golden caster sugar. With
    an electric mixer on maximum speed, whisk the eggs and sugar. They will look thick
    and creamy, like a milk shake. This can take 3-8 minutes, depending on how powerful
    your mixer is. You’ll know it’s ready when the mixture becomes really pale and about
    double its original volume. Another check is to turn off the mixer, lift out the
    beaters and wiggle them from side to side. If the mixture that runs off the beaters
    leaves a trail on the surface of the mixture in the bowl for a second or two, you’re there.
    Pour the cooled chocolate mixture over the eggy mousse, then gently fold together
    with a rubber spatula. Plunge the spatula in at one side, take it underneath and
    bring it up the opposite side and in again at the middle. Continue going under
    and over in a figure of eight, moving the bowl round after each folding so you
    can get at it from all sides, until the two mixtures are one and the colour is a
    mottled dark brown. The idea is to marry them without knocking out the air, so be
    as gentle and slow as you like.
    Hold the sieve over the bowl of eggy chocolate mixture and resift the cocoa and
    flour mixture, shaking the sieve from side to side, to cover the top evenly.
    Gently fold in this powder using the same figure of eight action as before.
    The mixture will look dry and dusty at first, and a bit unpromising, but if
    you keep going very gently and patiently, it will end up looking gungy and fudgy.
    Stop just before you feel you should, as you don’t want to overdo this mixing.
    Finally, stir in the white and milk chocolate chunks until they’re dotted throughout.
    Pour the mixture into the prepared tin, scraping every bit out of the bowl with
    the spatula. Gently ease the mixture into the corners of the tin and paddle the
    spatula from side to side across the top to level it. Put in the oven and set your
    timer for 25 mins. When the buzzer goes, open the oven, pull the shelf out a bit
    and gently shake the tin. If the brownie wobbles in the middle, it’s not quite done,
    so slide it back in and bake for another 5 minutes until the top has a shiny,
    papery crust and the sides are just beginning to come away from the tin. Take out of the oven.
    Leave the whole thing in the tin until completely cold, then, if you’re using the
    brownie tin, lift up the protruding rim slightly and slide the uncut brownie out
    on its base. If you’re using a normal tin, lift out the brownie with the foil.
    ut into quarters, then cut each quarter into four squares and finally into triangles.
    They’ll keep in an airtight container for a good two weeks and in the freezer for up to a month.`,
    price: 50,
  },
  {
    name: 'White chocolate berry cheesecake',
    foodProfile:  'veggie',
    imgUrl: 'http://bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--45905_12.jpg?itok=E0TTlAcW',
    duration: '25 min',
    level: 2,
    points: 30,
    ingredients: [
    '2 x 150g bars white chocolate',
    '2 x 300g tubs soft cheese (we used Philadelphia)',
    '284ml pot double cream',
    '50g caster sugar',
    '170g punnet raspberries',
    '5 tbsp raspberry jam',
    '85g amaretti biscuits',
    '200g small strawberries',
    'a few blueberries (optional)',
    ],
    preparation: `Break the chocolate into a glass bowl, then put it over a pan
    of just simmering water to melt, making sure the bottom of the bowl doesn’t
    touch the water. Line a lightly oiled 900g loaf tin with cling film.
    Whisk the cheese, cream and sugar together, preferably with electric beaters,
    then stir into the almost-cool melted white chocolate until well combined.
    Stir 50g raspberries with 2 tbsp of the jam. Spoon half the cheese mixture
    into the loaf tin, then spoon the jammy raspberries down the centre. Top
    with the rest of the cheese mixture, level the top, then press in the biscuits.
    Cover and chill for 6 hrs or overnight.
    Set aside about 6 strawberries. Halve the rest, then warm in a pan with the
    remaining jam until soft. Whizz in a food processor or with a hand blender,
    then rub through a sieve to remove the seeds and make a sauce. Add a drop of
    water if the sauce is too thick.
    To serve, carefully turn the tin onto a plate, lift it away and strip off
    the cling film. Halve the remaining strawberries, then arrange on top of
    the cake with the remaining raspberries and blueberries (if using). Pour over
    a little sauce and serve the rest separately for drizzling over.`,
    price: 50,
  },
  {
    name: 'Ultimate meringue',
    foodProfile:  'veggie',
    imgUrl: 'https://www.abouttimemagazine.co.uk/wp-content/uploads/2014/05/Coffee-Meringues-21.png',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '4 large organic egg whites, at room temperature',
    '115g caster sugar',
    '115g icing sugar',
    ],
    preparation: `Preheat the oven to fan 100C/ conventional 110C/gas 1⁄4. Line 2
    baking sheets with Bake-O-Glide non-stick liner or parchment paper (meringue
    can stick on greaseproof paper and foil).
    Tip the 4 large egg whites into a large clean mixing bowl (not plastic).
    Beat them on medium speed with an electric hand whisk until the mixture
    resembles a fluffy cloud and stands up in stiff peaks when the blades are lifted.
    Now turn the speed up and start to add 115g caster sugar, a dessertspoonful
    at a time. Continue beating for 3-4 seconds between each addition. It’s
    important to add the sugar slowly at this stage as it helps prevent the
    meringue from weeping later. However, don’t over-beat. When ready, the mixture
    should be thick and glossy.
    Sift one third of the 115g icing sugar over the mixture, then gently fold it
    in with a big metal spoon or rubber spatula. Continue to sift and fold in the
    remaining icing sugar a third at a time. Again, don’t over-mix. The mixture
    should now look smooth and billowy, almost like a snow drift.
    Scoop up a heaped dessertspoonful of the mixture. Using another dessertspoon,
    ease it on to the baking sheet to make an oval shape (pic 3). Or just drop
    them in rough rounds, if you prefer. Bake for 1 1⁄2-1 3⁄4 hours in a fan
    oven, 1 1⁄4 hours in a conventional or gas oven, until the meringues sound
    crisp when tapped underneath and are a pale coffee colour. Leave to cool on
    the trays or a cooling rack. (The meringues will now keep in an airtight tin
    for up to 2 weeks, or frozen for a month.) Serve two meringues sandwiched
    together with a generous dollop of softly whipped double cream.`,
    price: 50,
  },
  {
    name: 'Raspberry Bakewell cake',
    foodProfile:  'veggie',
    imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--559459_11.jpg?itok=Dg7CFR8B',
    duration: '60 min',
    level: 4,
    points: 70,
    ingredients: [
    '140g ground almond',
    '140g butter, softened',
    '140g golden caster sugar',
    '140g self-raising flour',
    '2 eggs',
    '1 tsp vanilla extract',
    '250g raspberry',
    '2 tbsp flaked almond',
    'icing sugar, to serve',
    ],
    preparation: `Heat oven to 180C/160C fan/gas 4 and base-line and grease a deep
    20cm loose-bottomed cake tin. Blitz the ground almonds, butter, sugar, flour,
    eggs and vanilla extract in a food processor until well combined.
    Spread half the mix over the cake tin and smooth over the top. Scatter the
    raspberries over, then dollop the remaining cake mixture on top and roughly spread –
    you might find this easier to do with your fingers. Scatter with flaked almonds and
    bake for 50 mins until golden. Cool, remove from the tin and dust with icing sugar to serve.`,
    price: 100,
  },
  {
    name: 'New York cheesecake',
    foodProfile:  'veggie',
    imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1001487_11.jpg?itok=rUW9cFzU',
    duration: '120 min',
    level: 5,
    points: 100,
    ingredients: [
    '85g butter',
    'melted, plus extra for tin',
    '140g digestive biscuit, made into fine crumbs',
    '1 tbsp sugar, granulated or golden caster',
    'For the cheesecake filling',
    '3 x 300g/11oz pack Philadelphia cheese, or other full-fat soft cheese',
    '250g golden caster sugar',
    '3 tbsp plain flour',
    '1½ tsp vanilla extract',
    'finely grated zest of 1 lemon',
    '(about 2 tsp)',
    '1½ tsp lemon juice',
    '3 large eggs, plus 1 yolk',
    '284ml carton soured cream',
    'For the soured cream topping',
    '142ml carton soured cream',
    '1 tbsp golden caster sugar',
    '2 tsp lemon juice',
    ],
    preparation: `Preheat the oven to fan 100C/ conventional 110C/gas 1⁄4. Line 2
    baking sheets with Bake-O-Glide non-stick liner or parchment paper (meringue
    can stick on greaseproof paper and foil).
    Tip the 4 large egg whites into a large clean mixing bowl (not plastic).
    Beat them on medium speed with an electric hand whisk until the mixture
    resembles a fluffy cloud and stands up in stiff peaks when the blades are lifted.
    Now turn the speed up and start to add 115g caster sugar, a dessertspoonful
    at a time. Continue beating for 3-4 seconds between each addition. It’s
    important to add the sugar slowly at this stage as it helps prevent the
    meringue from weeping later. However, don’t over-beat. When ready, the mixture
    should be thick and glossy.
    Sift one third of the 115g icing sugar over the mixture, then gently fold it
    in with a big metal spoon or rubber spatula. Continue to sift and fold in the
    remaining icing sugar a third at a time. Again, don’t over-mix. The mixture
    should now look smooth and billowy, almost like a snow drift.
    Scoop up a heaped dessertspoonful of the mixture. Using another dessertspoon,
    ease it on to the baking sheet to make an oval shape (pic 3). Or just drop
    them in rough rounds, if you prefer. Bake for 1 1⁄2-1 3⁄4 hours in a fan
    oven, 1 1⁄4 hours in a conventional or gas oven, until the meringues sound
    crisp when tapped underneath and are a pale coffee colour. Leave to cool on
    the trays or a cooling rack. (The meringues will now keep in an airtight tin
    for up to 2 weeks, or frozen for a month.) Serve two meringues sandwiched
    together with a generous dollop of softly whipped double cream.`,
    price: 100,
  },
  {
    name: 'Cherry, almond & lemon mascarpone tart',
    foodProfile:  'veggie',
    imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--559459_11.jpg?itok=Dg7CFR8B',
    duration: '95 min',
    level: 5,
    points: 90,
    ingredients: [
    '375g block dessert pastry',
    'about 700g/1lb 9oz cherries, stoned',
    'For the frangipane filling',
    '100 g/ 4 oz unsalted butter at room temperature',
    '100 g/ 4 oz golden caster sugar',
    '100 g/ 4 oz ground almond',
    '1 egg',
    'splash of Disaronno or Marsala, if you have it',
    'For the mascarpone mix',
    '2 x 250g tubs mascarpone',
    'zest and juice 1 lemon',
    '140 g/ 5 oz icing sugar, plus extra for dustingr',
    ],
    preparation: `Roll out the pastry on a lightly floured surface to just thinner
    than a £1 coin. Use to line a 22cm loose-bottomed tart tin, leaving an overhang
    on the sides. Leave to chill in the fridge on a baking sheet. To make the
    frangipane, whizz everything together in a food processor until combined.
    Heat oven to 200C/180C fan/gas 6 and line the tart case with baking parchment
    and beans. Bake for 20 mins, then remove parchment and beans, lightly prick
    the base with a fork and continue to bake for 10 mins until pale biscuity.
    Spread the frangipane over the base and return to the oven for 15 mins until cooked.
    Remove from the oven, trim the sides of the pastry and leave to cool completely.
    Beat the mascarpone with the lemon zest and juice and the icing sugar. Spread over
    the frangipane. Arrange the cherries on top, dust heavily with icing sugar,
    remove from the tin and serve.`,
    price: 100,
  },
  {
    name: 'Brilliant banana loaf',
    foodProfile:  'veggie',
    imgUrl: 'https://realfood.tesco.com/media/images/RFO-1400x919-Bread-77649390-abb8-41bc-891c-09df326e5e20-0-1400x919.jpg',
    duration: '55 min',
    level: 3,
    points: 50,
    ingredients: [
    '140g butter, softened, plus extra for the tin',
    '140g caster sugar',
    '2 large eggs, beaten',
    '140g self-raising flour',
    '1 tsp baking powder',
    '2 very ripe bananas, mashed',
    '50g icing sugar',
    ],
    preparation: `Heat oven to 180C/160C fan/gas 4.
    Butter a 2lb loaf tin and line the base and sides with baking parchment.
    Cream the butter and sugar until light and fluffy, then slowly add the eggs
    with a little flour. Fold in the remaining flour, baking powder and bananas.
    Pour into the tin and bake for about 30 mins until a skewer comes out clean.
    Cool in the tin for 10 mins, then remove to a wire rack.
    Mix the icing sugar with 2-3 tsp water to make a runny icing. Drizzle the
    icing across the top of the cake and decorate with banana chips.`,
    price: 50,
  },
  {
    name: 'Gooseberry meringue tart',
    foodProfile:  'veggie',
    imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1259805_7.jpg?itok=9lSRtG2a',
    duration: ' 45 min',
    level: 3,
    points: 50,
    ingredients: [
    '375g pack shortcrust pastry (preferably dessert pastry)',
    '50g butter',
    '100g light brown sugar',
    '500g gooseberry',
    '2 egg whites',
    '100g caster sugar',
    '1 tsp cornflour',
    ],
    preparation: `Heat oven to 180C/fan160C/gas 4. Roll out the pastry on a lightly
    floured surface, then use it to line a 23cm loose-bottom tart tin. Line with
    non-stick baking parchment and baking beans, then bake for 15 mins. Remove the
    beans, then cook for 10 mins more until golden. Remove from the oven, then
    reduce the heat to 140C/fan 120C/gas 1.
    While the case is cooking, heat the butter and brown sugar in a shallow pan.
    When the sugar has completely dissolved, throw in the gooseberries and toss
    in the caramel. Cook for a few mins until they start to split, but before they
    have burst completely. Remove from heat and leave to cool. Once cool give them
    a stir, then tip into pastry case.
    For the meringue topping, whisk the egg whites to soft peaks. Whisk in the caster
    sugar a spoonful at a time, then whisk in the cornflour. Carefully blob the
    meringue over the gooseberries and gently spread to cover. Bake for about
    40 mins until the meringue is cooked and lightly browned.`,
    price: 50,
  },
  {
    name: 'Chocolate fondant',
    foodProfile:  'veggie',
    imgUrl: 'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--559459_11.jpg?itok=Dg7CFR8B',
    duration: '15 min',
    level: 1,
    points: 5,
    ingredients: [
    '50g melted butter, for brushing',
    'cocoa powder, for dusting',
    '200g good-quality dark chocolate, chopped into small pieces',
    '200g butter, in small pieces',
    '200g golden caster sugar',
    '4 eggs and 4 yolks',
    '200g plain flour',
    ],
    preparation: `First get your moulds ready. Using upward strokes, heavily
    brush the melted butter all over the inside of the pudding mould.
    Place the mould in the fridge or freezer. Brush more melted butter over the
    chilled butter, then add a good spoonful of cocoa powder into the mould.
    Tip the mould so the powder completely coats the butter. Tap any excess
    cocoa back into the jar, then repeat with 1 the next mould.
    Place a bowl over a pan of barely simmering water, then slowly melt the
    chocolate and butter together. Remove bowl from the heat and stir until
    smooth. Leave to cool for about 10 mins.
    In a separate bowl whisk the eggs and yolks together with the sugar until
    thick and pale and the whisk leaves a trail; use an electric whisk if you want.
    Sift the flour into the eggs, then beat together.
    Pour the melted chocolate into the egg mixture in thirds, beating well between
    each addition, until all the chocolate is added and the mixture is completely
    combined to a loose cake batter.
    Tip the fondant batter into a jug, then evenly divide between the moulds.
    The fondants can now be frozen for up to a month and cooked from frozen.
    Chill for at least 20 mins or up to the night before. To bake from frozen,
    simply carry on as stated, adding 5 mins more to the cooking time.
    Heat oven to 200C/fan 180C/gas 6. Place the fondants on a baking tray,
    then cook for 10-12 mins until the tops have formed a crust and they are
    starting to come away from the sides of their moulds. Remove from the oven,
    then leave to sit for 1 min before turning out.
    Loosen the fondants by moving the tops very gently so they come away from the
    sides, easing them out of the moulds. Tip each fondant slightly onto your
    hand so you know it has come away, then tip back into the mould ready to plate up.
    Starting from the middle of each plate, squeeze a spiral of caramel sauce – do
    all the plates you need before you go on to the next stage.
    Sit a fondant in the middle of each plate. Using a large spoon dipped in hot
    water, scoop a ‘quenelle’ of ice cream.
    Carefully place the ice cream on top of the fondant, then serve immediately.
    Repeat with the rest of the fondants.`,
    price: 10,
  },
//VEGAN
  {
    name: 'Strawberry Cheesecake Bites',
    foodProfile:'vegan',
    imgUrl: 'https://i1.wp.com/delightfuladventures.com/wp-content/uploads/2017/08/cashew-free-vegan-lemon-strawberry-cheesecake-bites.jpg?resize=710%2C900&ssl=1',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '1 cup pecans',
    '6 medjool dates',
    '1/4 cup shredded coconut',
    '1/4 tsp sea salt',
    'Filling:',
    '1 cup raw cashews (soaked for 3 hours)',
    '1/2 cup frozen strawberry slices',
    '1/4 cup agave nectar',
    '1/4 cup coconut oil (melted)',
    '2 Tbsp lemon juice',
    ],
    preparation: `Remove the pits from the medjool dates and soak them in warm
    water for 10 minutes. Drain the water from the dates and place in a food
    processor along with the remaining ingredients. Process until the nuts are
    crumbled and the crust is sticking together on it’s own.
    Press about 1 1/2 tsp of the mixture into the bottom of each mini muffin cup.
    Tip: To remove the cheesecakes easily from the tray, cut 4-inch strips of
    parchment paper and place those in the bottom of each cup. Press the crust
    mixture on top of these. Then when the cheesecakes are done setting in the
    freezer you can pull on the parchment tabs to lift the cheesecakes out.
    Filling: Drain cashews from the soaking water and rinse under fresh water.
    Then add them to a high speed blender or Vitamix along with frozen strawberries,
    agave nectar, melted coconut oil, and lemon juice. Blend until smooth.
    Pour this mixture into a bowl and set aside. Clean out the blender to make
    the strawberry puree for the swirl.`,
    price: 10,
  },
  {
    name: 'Coconut tapioca with sweet rice balls',
    foodProfile:  'vegan',
    imgUrl: 'http://thewoksoflife.com/wp-content/uploads/2017/01/coconut-tapioca-dessert-8.jpg',
    duration: '95 min',
    level: 4,
    points: 70,
    ingredients: [
    'Dough',
    '3 cups all-purpose flour, plus more for rolling',
    '2 Tbsp vegan granulated sugar',
    '2 Tbsp white vinegar',
    'Fine salt',
    '1 cup unrefined virgin or extra-virgin coconut oil',
    '8 - 10 ice water',
    'Filling',
    '4 lb(s) mixed apples (8 or 9), such as Golden Delicious, Granny Smith and McIntosh',
    '⅔ cup vegan granulated sugar, plus more for sprinkling',
    '2 Tbsp fresh lemon juice',
    '4 Tbsp unrefined virgin or extra-virgin coconut oil',
    '3 Tbsp all-purpose flour',
    '1 tsp ground cinnamon or apple-pie spice',
    '¼ tsp fine salt',
    '2 Tbsp unsweetened almond or soy milk',
    ],
    preparation: `Dough
    Put the flour, sugar, vinegar and 1/2 teaspoon salt in a food processor,
    and pulse to combine. Add the coconut oil in small spoonfuls, and pulse until
    the largest pieces are pea-size. Add 8 tablespoons ice water, and pulse until
    evenly combined. Squeeze a handful of the dough together; it should just
    hold its shape. If the mixture is very powdery, pulse in an additional 1 to 2
    tablespoons ice water. Divide the dough between 2 large pieces of plastic wrap,
    pat each into a 1/2-inch thick discs and chill for at least 1 hour up to overnight.
    Filling
    Meanwhile, peel and core the apples; cut into 1/2-inch-thick slices.
    Toss with the sugar and lemon juice in a large bowl. Melt the coconut
    oil in a large skillet over medium-high heat. Add the apples and cook,
    stirring occasionally, until the firmer apples soften but hold their shape,
    about 12 minutes. Add the flour, cinnamon and 1/4 teaspoon salt, and stir to
    combine. Remove from the heat, and let cool completely. (The filling can be
    made up to 2 days ahead; cover and refrigerate.)
    To assemble: To make rolling easier, let the dough soften a bitit should be
    lightly soft when pressedat room temperature (this may take anywhere from 20
    to 40 minutes depending on the temperature of your kitchen). Roll 1 disc
    of dough out into a 13-inch round on a lightly floured surface or between
    two pieces of floured parchment or wax paper. If the dough gets too warm,
    refrigerate it to firm it up. Ease the crust into a 9 1/2-inch deep-dish
    pie pan. Add the cooled filling, mounding it slightly in the center.
    Roll out the remaining dough disc into a 12-inch round; place it over the
    filling, and press the 2 crusts together around the edges. Fold the overhanging
    dough under itself, and crimp as desired. Brush the top and edges with the almond
    milk, and sprinkle generously with sugar. Pierce the top with a knife (or make
    decorative cutouts) a few times to let steam escape. Chill for at least 1 hour.
    Position an oven rack in the lowest position in the oven, place a baking sheet
    on the rack and preheat to 425ºF; preheat for at least 30 minutes. Place the
    pie on the hot baking sheet, and lower the oven to 375ºF. Bake until the pie
    is golden and the filling is bubbly, 1 hour to 1 hour 20 minutes, rotating as
    needed. (Cover the edges with foil if they brown too quickly.) Transfer to a
    rack, and cool until set, about 3 hours.`,
    price: 100,
  },
  {
    name: 'Citrus mumffins',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/recipetracker/3249a806-9d57-487c-baac-0f1259f21417_vegan-citrus-upside-down-gluten-free-muffins_WebReady.jpg',
    duration: '55 min',
    level: 4,
    points: 60,
    ingredients: [
    '2 Tbsp flax meal',
    '¼ cup + 1 Tbsp warm water',
    '¼ cup + 1 Tbsp melted coconut oil, divided',
    '1 ¼ cups coconut sugar, lightly packed and divided',
    '2 Mandarin oranges + zest*',
    '2 ⅓ cups oat flour, sifted (215g)',
    '½ Tbsp baking powder',
    '½ tsp baking soda',
    '½ tsp salt',
    '½ Tbsp cinnamon',
    '½ tsp ginger powder',
    '2 tsp vanilla extract',
    '1 tsp raw apple cider vinegar',
    '¾ cup Bay Bubbles Gimbi Pink Grapefruit, at room temperature',
    ],
    preparation: `In a small bowl, whisk together the flax meal and warm water.
    Make sure to add the flax meal into the bowl first, and stir the water into
    it, as opposed to vice versa. Place the bowl into the refrigerator for 30
    minutes so it can gel together.
    While the flax egg sits divide 1 Tbsp of melted coconut oil between the 12
    cavities of a muffin tin, or 1/4 tsp melted oil per cavity. Use your fingers
    to lightly spread a little bit of oil up the sides of the cavity, but keep
    the majority of it on the bottom of the cavity, and rub around to evenly coat it.
    Divide 1/4 cup of coconut sugar between the cavities (about 1 tsp per cavity)
    sprinkling evenly, just onto the bottom of each cavity.
    Zest both of the oranges into a large bowl (you'll use it later) and then
    peel them. Place the oranges on their side, and slice each into 6 thin slices.
    Gently place one slice into the bottom of each muffin cavity. Set aside and
    preheat your oven to 350ºF.
    In a medium bowl, stir together the sifted oat flour, baking powder, baking
    soda, salt, cinnamon and ginger powder until well mixed. Set aside.
    Place the remaining 1/4 cup of melted coconut oil and 1 cup of coconut sugar
    into the large bowl with the orange zest and beat together with an electric
    hand mixer, just until the coconut sugar is moistened.
    Add the vanilla extract, apple cider vinegar and the chilled flax egg into
    the sugar mixture and beat again until smooth and well mixed.
    Pour the Bai Bubbles into the oil/sugar mixture and whisk until smooth. The
    top will foam from the carbonation, which is normal. Add the dry ingredients
    into the wet ingredients and whisk until smooth and lump-free.
    Divide the mixture between the muffin cavities, filling almost right to the
    top.
    Bake until a tooth pick comes out clean, about 18-20 minutes. Let cool for
    5 minutes (not more, not less. You don't want the sugar to start to harden)
    and then turn the tins upside down onto a cooling rack to release the muffins.
    Lightly press the muffins down onto the rack to slightly flatten the bottoms
    and let cool completely.`,
    price: 50,
  },
  {
    name: 'Vegan Cheesecake',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/wp-content/uploads/sites/6/2016/12/vegan-cheesecake-3.jpg',
    duration: '480 min',
    level: 5,
    points: 100,
    ingredients: [
    'Homemade Graham Crust',
    '11/4 cups all-purpose flour',
    '2 Tbsp granulated sugar',
    '1 Tbsp miller’s bran (not cereal)',
    '1 tsp unsweetened cocoa powder',
    '1/2 tsp ground cinnamon',
    '1/3 cup vegan butter or coconut oil, melted',
    '1 Tbsp agave or maple syrup',
    'Filling',
    '2 (349 g/12.3 oz) packages silken extra-firm tofu',
    '1 Tbsp vanilla extract',
    '1 Tbsp lemon juice',
    '1 cup apple juice',
    '2/3 granulated sugar',
    '1 Tbsp agar agar flakes (Eden Foods makes one readily available)',
    ],
    preparation: `Homemade Graham Crust Preheat oven to 350ºF.
    In a medium bowl, mix flour, sugar, bran, cocoa and cinnamon until combined.
    Mix in vegan butter or oil and agave or maple syrup until fully combined.
    Firmly press into a 7-inch spring form pan.
    Bake for 15 to 20 minutes, until golden brown and beginning to crack on top.
    Cool completely.
    Filling In a medium saucepan, bring apple juice, sugar and agar agar to a boil,
    reduce to medium and cook, stirring a few times, for 5 minutes, or until agar
    agar flakes are completely dissolved. Keep warm.
    In a food processor, purée tofu until completely smooth, about 1 minute.
    Add apple juice mixture, lemon juice and vanilla. Purée until fully combined
    and pour into prepared crust. Cool to room temperature and refrigerate for
    at least 8 hours, until set.
    To serve run a knife around edge of spring form pan, unhinge and slice.
    Garnish with your topping of choice (chocolate, cherry, caramel, etc.).
    Serve chilled.`,
    price: 100,
  },
  {
    name: 'Blueberry Mini Muffins',
    foodProfile: 'vegan',
    imgUrl: 'https://www.saga.co.uk/contentlibrary/saga/publishing/verticals/food/recipes/christmas/mini-christmas-cake-muffins-1280.jpg',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '2 cup whole wheat spelt flour',
    '2 tsp baking powder',
    '½ tsp salt',
    '2 cup organic blueberries',
    '½ cup vegetable oil',
    '½ cup soy milk',
    '½ cup 100% maple syrup',
    '¼ cup agave nectar',
    ],
    preparation: `Preheat oven to 375°F and line a mini cupcake tin with paper cups.
    Mix wet ingredients together in large bowl, then stir in dry ingredients, followed by the blueberries.
    Using small spoons, divide the batter among the cups so they’re almost filled to the top.
    Bake until muffins are golden brown, for about 20 minutes.`,
    price: 50,
  },
  {
    name: 'Vegan Peanut Butter Chocolate Chip Ice Cream',
    foodProfile:  'vegan',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/originals/2f/76/5b/2f765b9c30ab5c5d8f7321e802d8754f.jpg',
    duration: '20 min',
    level: 2,
    points: 10,
    ingredients: [
    '2 sliced and frozen bananas',
    '2 Tbsp natural peanut butter',
    '3 Tbsp raw cacao nibs',
    'Pinch sea salt',
    'Drizzle of agave (or maple syrup), optional',
    ],
    preparation: `Place frozen banana slices in a food processor and run the
    machine until it resembles a crumb like consistency. Add peanut butter,
    cacao nibs, sea salt and agave, and whiz a little longer until you get a
    soft-serve ice cream consistency. Tip: You can add many other things to this
    frozen banana ice cream base. Try candied nuts, almond butter or another
    favourite nut butter, cinnamon, frozen blueberries, chopped dates, candied
    ginger… The options are endless.`,
    price: 10,
  },
  {
    name: 'Apple Spice Cake with Maple Buttercream',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/wp-content/uploads/sites/6/2015/11/888x600_vegan-apple-spice-cake-whole.jpg',
    duration: '40 min',
    level: 3,
    points: 50,
    ingredients: [
    '1 ¼ cup soymilk (room temperature)',
    '2 tsp apple cider vinegar',
    '2 ½ cups all-purpose flour',
    '1 tsp baking powder',
    '1 tsp baking soda',
    '2 tsp cinnamon',
    '½ tsp all-spice',
    '½ tsp ginger',
    '½ tsp sea salt',
    '1 cup shredded apple',
    '1/3 cup coconut oil (soft at room temperature)',
    '1 cup packed brown sugar',
    '½ Tbsp unsulphured blackstrap molasses',
    '2 tsp vanilla extract',
    '¾ cup pecans, roughly chopped',
    'Maple Buttercream Frosting:',
    '3 cups powdered sugar',
    '8 Tbsp vegan butter or margarine (room temperature)',
    '6 tablespoons maple syrup',
    ],
    preparation: `Pre-heat oven to 350°
    In small mixing bowl whisk together the soymilk and apple cider vinegar and set aside.
    In a large mixing bowl combine flour, baking powder, baking soda, cinnamon,
    all-spice, ginger, and sea salt. In a third bowl beat together coconut oil
    and brown sugar with a hand mixer until fluffy. Then beat in molasses,
    vanilla extract, and soymilk and vinegar mixture until smooth.
    Add the liquid ingredients and shredded apple to the dry ingredients.
    Fold the batter until it’s just combined, ensuring not to over mix it.
    Lightly oil 2 x 7 ¼” cake pans with a little bit of coconut oil. You can also
    bake one at a time if you only have 1 pan.
    Divide the batter evenly between the cake pans. Spread out the batter so it’s
    even and to the edge of the pan. Bake for 18-20 minutes on the centre rack.
    Cake is done when a toothpick comes out of the centre of the cake clean.
    Transfer cakes out of the pans onto wire racks and allow to cool completely
    before frosting. To make the frosting beat together vegan butter, powdered sugar,
    and maple syrup until fluffy and smooth. Place one cake bottom side down on your
    serving plate and spread frosting evenly with a spatula across the entire top
    of the cake. Place the other cake, bottom side down, on top of the frosting.
    Use remaining frosting to cover the entire cake. Using the palm of your hands
    gently press small handfuls of roughly chopped pecans along the entire side of
    the cake until well coated.`,
    price: 50,
  },
  {
    name: 'Peanut Butter Cups',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/files/2015/05/vegan-peanut-butter-cups.jpg',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    '1 bag of vegan chocolate chips (approximately 1 1/2 cups)',
    '1/4 cup peanut butter',
    ],
    preparation: `Line a muffin tin with paper liners or use a silicon muffin tray
    In a double boiler melt the chocolate chips until silky smooth. Put 1 teaspoon
    of melted chocolate into the bottom of the muffin liners and then spread it out
    evenly with your finger or a spoon. Refrigerate this for 10 mins.
    Then take 1 teaspoon of peanut butter and put that on top of the hardened chocolate.
    Don’t spread this out with your finger as it will settle itself and stay mostly
    in the centre. Refrigerate this for 10 mins.
    If your chocolate has become sludgier while you were waiting just put it back
    on the double boiler quickly to re-melt it. Then take 1 to 2 teaspoons more
    of melted chocolate and put that on top of the peanut butter. The peanut butter
    won’t be super hard but it will hold up for the rest of this process. If you’re
    rushed you don’t really have to put the peanut butter part in the fridge again.
    You can push the melted chocolate into the sides a bit with your teaspoon to
    ensure it runs down to cover the peanut butter. This won’t necessarily happen,
    especially if you don’t refrigerate the peanut butter part, but I don’t mind
    them looking a little rustic and oozy anyway!
    Smooth the top of the cups if you desire, but they might just settle nicely on
    their own. Then refrigerate this for at least 20 minutes before serving. Store
    in the fridge in an airtight container or at room temperature if you want softer cups.`,
    price: 50,
  },
  {
    name: 'Vegan Cranberry-Almond Tartlets',
    foodProfile:  'vegan',
    imgUrl: 'https://i.pinimg.com/736x/88/c5/20/88c520e9e75b701c44dfe0a7153fa14f--vegan-bakewell-tart-cherry-bakewell-tart.jpg',
    duration: '135 min',
    level: 5,
    points: 100,
    ingredients: [
    'Crust',
    '¾ cup rolled oats (see Cooks Notes)',
    '¾ cup whole toasted almonds (see Cooks Notes)',
    '¼ tsp sea salt',
    '¾ cup + 2 Tbsp oat flour',
    '6 Tbsp brown rice flour',
    '¼ cup melted extra-virgin coconut oil, plus more for the pans',
    '6 Tbsp maple syrup',
    'Filling',
    '¾ cup whole toasted almonds',
    '⅓ cup maple syrup',
    '1 Tbsp agar flakes',
    '1 pinch sea salt',
    '2 tsp arrowroot',
    '1 Tbsp pure vanilla extract',
    'Topping',
    '2 cup fresh or frozen cranberries',
    '¼ cup fresh orange juice',
    '3 Tbsp maple syrup',
    '1 pinch cinnamon',
    '1 tsp arrowroot',
    ],
    preparation: `
    Crust
    Process the rolled oats, almonds and salt in a food processor until finely
    ground. Transfer the mixture to a medium bowl, and stir in the oat flour and
    brown rice flour. Drizzle in the coconut oil, and mix well. Add the maple
    syrup and vanilla, then stir to combine. (The dough will be quite wet.) Cover
    the bowl, and set aside for 30 to 60 minutes or until the dough is moist but
    no longer sticky. Preheat the oven to 350ºF. Thoroughly oil ten 3-inch tartlet
    pans, and press the dough evenly into each, trimming excess dough from the edges.
    Prick the bottoms with a fork several times, place the tart pans on a baking
    sheet and bake until golden and fragrant, 20 to 22 minutes. Let cool.
    Filling
    Line a medium strainer with a thin kitchen towel or several layers of cheesecloth,
    and place it over a medium pot; set aside. Blend 2 1/2 cups water and the almonds
    in a blender until smooth. Pour the almond milk through the lined strainer into
    a pot. Gather the edges of the cloth, and gently squeeze out the milk; discard
    the dry pulp that remains. Add the maple syrup, agar flakes and salt to the
    almond milk, and whisk to combine. Bring the mixture to a boil over medium heat,
    whisking every minute or so. Cover the pot, reduce the heat to low and simmer
    until all the agar is dissolved, about 15 minutes. Combine the arrowroot with 1
    tablespoon water, and slowly drizzle the mixture into the simmering liquid.
    When the liquid returns to a simmer, remove the pot from the heat and whisk in
    the vanilla.
    Carefully remove the crusts from the pans. Pour 1/4 cup of the warm filling
    into each tart shell. Place the tartlets on a flat tray, set aside until the
    filling has stopped steaming, then refrigerate for at least 30 minutes or until
    ready to serve.
    Topping
    Bring the cranberries, orange juice, maple syrup and cinnamon to a boil in a
    small pot. Stir the mixture, cover the pot, reduce the heat to low and simmer
    for until the cranberries are soft, 5 minutes. Dissolve the arrowroot in 2
    teaspoons water, and slowly drizzle the arrowroot mixture into the cranberry mixture. Remove the pan from the heat once the mixture has returned to a simmer. Let cool. Top each tartlet with a spoonful of the cranberry mixture, and serve.`,
    price: 100,
  },
  {
    name: 'Coconut Cashew Rice Pudding',
    foodProfile:  'vegan',
    imgUrl: 'https://s3-ap-southeast-1.amazonaws.com/afc-prod/thumbnails/standard_mobile/7214/9656/6898/tn-recipes-KTWAO-EP-7-Coconut-Cashew-Rice-Pudding.jpg',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    '½ cup raw cashews',
    '1 cup coconut milk',
    '¼ cup Arborio rice',
    '3 Tbsp sugar',
    '2 tsp finely grated lime zest',
    '1 tsp vanilla extract',
    'fresh berries, coconut, and/or toasted cashews for garnish',
    ],
    preparation: `Put the cashews in a blender or food processor with 1 cup of
    water and puree until smooth (you will not have to strain this). Place the cashew
    milk, coconut milk, rice, sugar and lime zest in a medium saucepot and whisk
    while bringing it up to a simmer over medium heat. Cover loosely and continue
    to simmer gently, stirring often, until the rice is tender, about 25 minutes.
    Remove the pot from the heat and stir in the vanilla. Cool the pudding to room
    temperature and then chill before serving. Serve the pudding garnished with
    fresh berries, coconut shavings and/or toasted cashews.`,
    price: 50,
  },
  {
    name: 'Double Chocolate Cookies',
    foodProfile:  'vegan',
    imgUrl: 'http://assets.blog.foodnetwork.ca/files/2015/04/888_double-chocolate-chip-cookies1.jpg',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    'Ingredients:',
    '2 1/4 cups all purpose flour (or whole wheat flour)',
    '1/2 cup unsweetened dutch process cocoa',
    '1 tsp baking soda',
    '1/2 tsp salt',
    '1 1/4 cups granulated sugar',
    '1 cups earth balance butter',
    '2 tsp pure vanilla extract',
    '1 Tbsp unsulfured molasses',
    '1/4 cup non-dairy milk',
    '1 cup vegan chocolate chips',
    ],
    preparation: `Pre-heat the oven to 350°F.
    Sift together flour, cocoa, salt, baking soda and set aside. In a separate bowl
    cream together earth balance, sugar, vanilla, and molasses until fluffy. Then add
    in non-dairy milk and mix until well combined. Add your wet ingredients to the dry
    ingredients and mix well. Stir in chocolate chips. Scoop 1/4 cup of cookie dough
    and roll it into a ball, then flatten the cookie slightly with your hand onto un-greased
    cookie sheets. Bake for 10 minutes. Cool cookies on baking sheet for about 5 minutes
    or so and then transfer to a cooling rack for another 10-15 minutes.`,
    price: 50,
  },
  {
    name: 'Donas Christmas',
    foodProfile:  'vegan',
    imgUrl: 'http://dinehere.ca/sites/default/files/imagecache/restaurant_detail_full/sites/default/files/r_images/111097.jpg',
    duration: ' 30 min',
    level: 3,
    points: 50,
    ingredients: [
    '4 ½ cups soy milk',
    '⅔ cup agave syrup',
    '2 ½ oz fresh yeast',
    '½ oz salt',
    '4 lb(s) all-purpose flour',
    '½ cup oil (vegetable, canola or anything neutral)',
    'Coconut Glaze (see recipe below)',
    'toasted coconut, for garnish',
    'Glaze',
    '1 can #10 coconut milk',
    '2 lb(s) confectioners sugar',
    '½ vanilla bean, scraped',
    ],
    preparation: `In a large mixer whisk yeast into soy milk, agave and oil. Add flour and salt. Mix on first speed until comes together and 3 minutes on second speed.
    Let rise 45 minutes in a warm place.
    Fold dough and let rise until doubled in size.
    Shape into one 1 oz balls. Poke a hole in with your finger and stretch a little. Let proof until puffy, about 20 minutes.
    Deep fry in 350ºF oil until golden. Flip over so both sides cook evenly. Glaze and sprinkle with toasted coconut.
    Glaze
    Heat over medium heat until thick.`,
    price: 50,
  },
  {
    name: ' Chocolate Chip Banana Bread',
    foodProfile:  'vegan',
    imgUrl: 'https://i.pinimg.com/736x/83/a5/e1/83a5e160abf8c61fb4de5f8d5720c076--peanut-butter-banana-bread-chocolate-chip-banana-bread.jpg',
    duration: '40 min',
    level: 3,
    points: 50,
    ingredients: [
    '1 Tbsp ground flax',
    '3 Tbsp water',
    '1 1/2 cups spelt flour (or whole wheat flour)',
    '1 cup all-purpose flour',
    '1 tsp baking powder',
    '1/2 tsp sea salt',
    '1/4 tsp cinnamon',
    '2 ripe bananas',
    '2 tsp vanilla extract',
    '1/4 cup coconut oil, melted',
    '3/4 cup coconut sugar',
    '1/3 cup non-dairy milk',
    '1/2 cup vegan chocolate chips',
    '1/2 tsp coconut sugar, for topping (optional)',
    ],
    preparation: `Pre-heat your oven to 375°F.
    Whisk together ground flax and water. Let it sit in the fridge for 15 minutes to thicken.
    Meanwhile in a large mixing bowl, combine flours, baking powder, sea salt and
    cinnamon. Stir with a fork until well combined. In a separate mixing bowl mash
    the ripe bananas to a puree. Then add in vanilla extract, melted coconut oil,
    non-dairy milk, coconut sugar, and the thickened flax mixture. Stir together
    until well combined. Add the wet mixture to the bowl of dry ingredients and
    gently fold together until just combined, careful not to over mix. Fold in
    the chocolate chips. Transfer the mixture to an 8 x 4″ bread pan greased with
    a small pea size amount of coconut oil. Sprinkle 1/2 tsp coconut sugar on
    the top (optional). Bake at 375°F for 50-55 mins. Stick a long skewer or
    toothpick in the centre to check if it’s done. It should come out relatively
    clean. Allow the banana bread to cool out of the pan on a rack before cutting
    into slices or wrapping.`,
    price: 50,
  },
  {
    name: 'Chocolate Cheesecake Hearts',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/files/2015/02/raw-vegan-no-cook-dairy-free-chocolate-cheesecake-hearts-laura-jane.jpg',
    duration: '20 min',
    level: 2,
    points: 10,
    ingredients: [
    '2 ½ cups unsalted, unroasted cashews',
    '½ cup cocoa powder',
    '½ cup maple syrup',
    '¼ cup coconut oil',
    '1 tsp pure vanilla extract',
    '2 Tbsp lemon juice',
    '⅛ tsp sea salt',
    '¾ cup water',
    ],
    preparation: `Place all ingredients into your blender.
    Blend. Start slow and gently increase the speed. You may need to stop and start
    your blender a bit if your blender is getting hung up. If your blades won't move,
    turn blender off, create an air pocket down the side with a knife, and then blend
    again starting on low. Keep blending until it's very smooth, like a creamy
    chocolate fudge with no cashew chunks.
    Pour smooth mixture into a wide pan (or into silicone molds) and place in freezer.
    If you don't have heart-shaped silicone molds, this simple solution works well:
    Pour the mixture into a wide pan or glass dish. Smooth the mixture out using
    the back of a spoon — not too thick and about an inch or less deep. Freeze
    then slice into heart shapes. This recipe (when frozen for at least 8 hours)
    is super easy to cut into shapes.
    Store in freezer at all times. To eat, just open the freezer, slice into
    desired shape and eat immediately.
    Note: If your blender isn't very powerful, consider soaking cashews in warm
    water for 1-2 hours before blending to soften them. After soaking,
    rinse clean and blend immediately.`,
    price: 10,
  },
  {
    name: 'Chocolate Chip Cookies',
    foodProfile:  'vegan',
    imgUrl: 'https://cdn.kiwilimon.com/recetaimagen/25815/thumb400x300-23900.jpg',
    duration: '50 min',
    level: 4,
    points: 50,
    ingredients: [
    '½ cup virgin coconut oil',
    '½ cup packed light brown sugar',
    '¼ cup unsweetened applesauce',
    '1 tsp vanilla extract',
    '1 ¼ cup spelt flour',
    '2 Tbsp cornstarch',
    '1 Tbsp ground flaxseed',
    '½ tsp baking soda',
    '½ tsp salt',
    '1 cup vegan chocolate chips or chunks',
    ],
    preparation: `Preheat the oven to 350ºF and line a baking tray with parchment paper.
    Beat the coconut oil and brown sugar together until smooth (electric beaters are best), and then stir in the applesauce and vanilla.
    In a separate bowl, stir the spelt flour, cornstarch, flaxseed, baking soda and salt together. Add this to the sugar mixture and stir until blended, then stir in the chocolate chunks. Scoop teaspoonfuls of dough onto the baking tray, leaving 1 ½-inches between each cookie and press the cookie down a little.
    Bake the cookies for 11 to 13 minutes, until they just begin to brown a little. Cool the cookies on the tray and then store in an airtight container.
    The cookies will keep for up to 3 days.`,
    price: 50,
  },
  {
    name: 'Chocolate Pumpkin Truffle Pops',
    foodProfile:  'vegan',
    imgUrl: 'http://assets.blog.foodnetwork.ca/wp-content/uploads/sites/6/2015/10/888_pumpkin-truffle-pops.jpg',
    duration: '25 min',
    level: 2,
    points: 10,
    ingredients: [
    '¼ cup coconut flour',
    '¼ cup canned organic pumpkin pie mix',
    '5 medjool dates, pitted',
    '2 Tbsp natural peanut butter (or substitute another nut butter)',
    '¼ tsp vanilla powder (optional)',
    'Pinch sea salt',
    '¾ cup vegan chocolate chips',
    '½ Tbsp coconut oil',
    '¼ cup chopped pecans',
    '¼ sweetened shredded coconut',
    ],
    preparation: `In a food processor, combine coconut flour, pumpkin pie mix,
    dates, peanut butter, vanilla powder and sea salt until it forms a ball of dough.
    With your hands, roll balls approximately 1 ¼” in size and poke truffle pop
    sticks into each ball. Set them on a dish or baking sheet lined with parchment
    paper while you melt the chocolate coating.
    Melt chocolate chips with coconut oil in a double boiler or mixing bowl over
    a pot filled with a small amount of boiling water. 4. Stir until just melted
    and smooth, and remove from heat. Dip the truffle pops in the melted chocolate
    and swirl to coat evenly. Use a spoon to get chocolate coating near the base of
    the ball. Allow excess to drip off before standing them upright.
    Sprinkle coconut and/or pecans all over the chocolate, and using a piece of
    Styrofoam, place the truffle pop sticks in the 7. Styrofoam to stand upright
    in the fridge. Refrigerate for at least 30 minutes to let the chocolate set.
    Keep truffle pops in the fridge until serving.`,
    price: 10,
  },
  {
    name: 'Pumpkin Blondies',
    foodProfile:  'vegan',
    imgUrl: 'http://www.tessadomesticdiva.com/wp-content/uploads/2014/09/Pumpkin-Blondies-Gluten-Free-Vegan-6433.jpg',
    duration: '75 min',
    level: 5,
    points: 70,
    ingredients: [
    '¾ cup creamy almond butter',
    '3 Tbsp pure maple syrup',
    '⅔ cup pure canned pumpkin',
    '½ cup coconut sugar, firmly packed',
    '½ Tbsp vanilla extract',
    '½ Tbsp apple cider vinegar',
    '¼ cup + 2 Tbsp coconut flour, sifted (31g)*',
    '½ tsp baking soda',
    '¼ tsp baking powder',
    '¼ tsp salt',
    '½ tsp cinnamon',
    '½ Tbsp pumpkin pie spice',
    '3 Tbsp almonds, finely chopped',
    ],
    preparation: `Preheat your oven to 325ºF and line the bottom of an 8x8-inch square baking pan with parchment paper and spray the sides generously with coconut oil spray. **
    In a large, microwave-safe bowl,*** melt the almond butter with the maple syrup in the microwave until the almond butter is creamy, about 1 minute.
    Add the pumpkin into the mixture and beat with an electric hand mixer until well combined, scraping the sides down as necessary.
    Beat the coconut sugar, vanilla and apple cider vinegar into the almond butter mixture until well combined.
    Add the sifted coconut flour, baking soda, baking powder, salt, cinnamon and pumpkin pie spice into the mixture and stir until smooth and well combined. Make sure you scrape all the flour off the sides of the bowl into the mixture.
    Pour the batter into the prepared pan and smooth out evenly. Sprinkle with the chopped nuts. Let the batter stand for 5 minutes before baking, to allow the coconut flour to begin absorbing the moisture.
    Bake until a toothpick inserted into the center comes out clean and the edges are crisp, about 50-55 minutes. Let cool COMPLETELY before cutting into bars and DEVOURING.`,
    price: 100,
  },
  {
    name: 'Raspberry Peach Fruit Leather',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/imageserve/wp-content/uploads/sites/6/2014/12/c9b70e2ed47b844dbfb6ed0b8a43943a/x.jpg',
    duration: '10 min',
    level: 1,
    points: 5,
    ingredients: [
    '7 oz frozen raspberries',
    '7 oz frozen peaches',
    '1 tsp finely grated orange zest',
    ],
    preparation: `Thaw the fruit in a strainer over a bowl, to allow any excess juices to run out.
    Preheat the oven to 175ºF and line a large baking tray with a Silpat. Puree the fruits with the orange zest until smooth. Spread the puree evenly over the entire Siplat, taking care to make it as level as possible. Bake this for 4 to 5 hours, until dried but still pliable. Allow the fruit leather to cool, and then peel it off the Silpat and slice it into pieces.
    The fruit leather will keep in an airtight container for up to 2 weeks.`,
    price: 10,
  },
  {
    name: 'Powdered Sugar Doughnuts',
    foodProfile:  'vegan',
    imgUrl: 'http://media.foodnetwork.ca/recipetracker/0b7b99a7-1a44-4df4-baa0-ef4ad3cf5cb2_gluten-free-powdered-sugar-doughnuts_WebReasy.jpg',
    duration: '20 min',
    level: 2,
    points: 5,
    ingredients: [
    '1 cup soy milk',
    '1 tsp apple cider vinegar',
    '1 Tbsp ground flax',
    '3 Tbsp water',
    '¼ cup vegetable oil',
    '¼ cup organic golden sugar (or unbleached granulated sugar)',
    '1 ½ tsp vanilla extract',
    '2 ¼ cups gluten-free flour mix (Bob’s Red Mill Gluten-Free Biscuit & Baking Mix)',
    '1 tsp cinnamon',
    '3 - 4 cups vegetable oil (for deep frying)',
    '½ cup powdered icing sugar',
    ],
    preparation: `In a small bowl mix together ground flax and water. Let is sit
    for 15 minutes in the fridge to thicken.
    In a mixing bowl combine soy milk and apple cider vinegar and allow to sit
    for 15 minutes. After letting these 2 components sit for 15 minutes heat up
    vegetable oil in a pot to 375°F while you prepare the rest of the dough.
    In a large mixing bowl add 2 cups of gluten-free flour mix (the other ¼ cup
      is for rolling out the dough) and mix with cinnamon until well combined.
    Add the ¼ cup of vegetable oil, vanilla extract, sugar, and flax mixture to
    the bowl with soy milk and apple cider vinegar and whisk together until well combined.
    Fold the wet ingredients into the dry ingredients until it just comes together
    into a sticky ball of dough. On a clean, dry surface spread out ¼ cup of the
    flour and place the dough from the bowl onto the floured surface. Knead the dough
    into a little bit of this flour as well as ensuring you keep the surface floured
    to prevent the dough from sticking. It will become a little less sticky to handle
    as you incorporate a bit more of this flour into it. Pat the dough down with your
    hand until it’s ½” thick. Cut 2 ½” circles from this dough. Being sure to lightly
    coat the cookie cutter with excess flour on the counter.
    Bring the excess dough together in a ball again, ensure you’ve spread out a
    bit more of the excess flour across your surface/counter and flatten the dough
    again to ½” thick and continue to cut out circles. After this second round of
    cutting out circles you should be left with just enough dough to make one or
    2 more doughnuts with your hands.
    To make the center hole you can light coat the thicker end of a chopstick with
    a bit of excess flour. Then stick it through the middle of the circles and roll
    it around a little to create a small ¼” hole.
    Place powdered sugar into a shallow dish and have it near your frying oil.
    You’re going to sugar the doughnuts right out of the fryer.
    Ensure your oil has reached a temperature of 375°F and place 2 to 3 doughnuts
    in the hot oil. After about 1 minute they should be floating at the surface.
    Using a slotted frying spoon gently flip them. Then let them fry for another
    1 ½ minutes until golden.
    Lift them out with the slotted frying spoon allowing excess oil to drip onto
    paper towel. You can let them sit for a few seconds but you want to get them
    powdered with sugar pretty immediately while they’re still hot. Roll the doughnuts
    around in the powdered sugar until coated evenly and place them on a separate
    clean plate. Continue this process until all the doughnuts are fried.
    It’s best to eat these immediately while they’re still warm!`,
    price: 10,
  },
  {
    name: 'Banana Ice Cream',
    foodProfile:  'vegan',
    imgUrl: 'https://nadialim.com/wp-content/uploads/2016/12/christmas-pudding-ice-cream-555x463.jpg',
    duration: '5 min',
    level: 1,
    points: 2,
    ingredients: [
    '2 fresh bananas',
    'cinnamon, to taste',
    '1 - 2 tsp maple syrup',
    ],
    preparation: `Slice fresh bananas and freeze for 60-90 minutes.
    Blend frozen bananas, garnish with cinnamon, drizzle with maple syrup and enjoy!`,
    price: 10,
  },
  {
    name: 'Cinnamon Rolls with Spiced Whiskey Peaches',
    foodProfile:  'vegan',
    imgUrl: 'https://www.rhodesbread.com/images/recipes/CinnamonRollChristmasTreeLarge.jpg',
    duration: '45 min',
    level: 3,
    points: 50,
    ingredients: [
    'For the Dough:',
    '1 packet active dry yeast (2 ¼ tsp)',
    '1 cup warm water (100°F)',
    '¼ cup sugar',
    '3 cups all-purpose flour',
    '1 tsp sea salt',
    '¼ cup coconut oil (melted)',
    '¼ cup all-purpose flour (for rolling out dough)',
    '1 tsp coconut oil (to oil the bowl for proofing)',
    'For the Spiced Peaches:',
    '3 ripe peaches, peeled and diced (approximately 3 cups)',
    '1 cup Spicebox canadian spiced whiskey (or bourbon)',
    '¼ cup maple syrup',
    'For the Filling:',
    '2 Tbsp vegan butter (melted)',
    '¼ cup sugar',
    '1 Tbsp cinnamon',
    'For the Icing:',
    '1 cup icing sugar',
    '1 Tbsp vegan butter (softened)',
    '1 Tbsp non-dairy milk (or water)',
    '½ tsp vanilla extract',
    ],
    preparation: `Combine active dry yeast with warm water and sugar. The water
    needs to be at a temperature of around 100°F for the yeast to activate, so it’s
    best to use a thermometer. Allow the mixture to sit for 10 minutes. It should
    double in size and be foamy at the top. Meanwhile melt your coconut oil over
    low heat. Ensure the coconut oil is also not heated above 100°F. Combine flour
    with sea salt in a large mixing bowl. Then, create a well in the middle of the
    flour and pour the yeast mixture and the coconut oil into it. Fold the dough
    gently to combine. It should just come together and then you can use your
    hands to knead it a few times to form a ball. Lightly oil another large mixing
    bowl with 1 tsp of coconut oil and place the ball of dough in it to proof.
    Cover with plastic wrap and a towel, and leave it in a warm dark place for
    2 hours. On top of the fridge or in the oven or microwave should be enough
    to keep any cool draft off of it. The dough will double in size. While the
    dough is rising, you can prepare the spiced peaches. In a saucepan, heat spiced
    whiskey, maple syrup and diced peaches over medium heat. Simmer for 15 minutes,
    stirring occasionally and then remove from heat and cool completely. Combine
    sugar and cinnamon for the filling and set aside. Melt the butter in the pan
    you want to bake the cinnamon rolls in, and then you can use the residue to
    grease all sides of the pan. Once dough has proofed, lightly flour a clean
    dry surface/countertop and roll out the dough to approximately a 16” x 16”
    square. Leave a 1” edge on one side of the dough free from melted butter and
    any fillings. This will be the outer edge when you roll the dough up. Brush
    melted butter on the surface of the dough. Sprinkle the cinnamon sugar mixture
    evenly on top, then take the spiced peaches and spread them out on top of the
    cinnamon sugar. Start at the opposite side of the clean edge and roll the dough
    into a log shape.
    Take a sharp knife and cut 12 equal rolls.
    Place the rolls in the pan leaving a bit of space to the edge of the pan. Cover
    the pan in plastic wrap and a towel, and allow the rolls to proof in a warm dark
    place for another 2 hours. Pre-heat oven to 350°F. Bake the rolls for 25-30 minutes.
    Allow the cinnamon rolls to cool for 10-15 minutes and make the icing by combining
    all the icing ingredients in a small bowl with a hand mixer until smooth.
    Spread the icing on top of warm cinnamon rolls and serve immediately.`,
    price: 50,
  },
  {
    name: 'Pumpkin Scones with Maple Glaze',
    foodProfile:  'vegan',
    imgUrl: 'http://heatherchristo.com/wp-content/uploads/2016/11/Pumpkin-Maple-Scones-copy-cat-starbucks-scones-gluten-free-and-vegan-from-HeatherChristo.com_.jpg',
    duration: '35 min',
    level: 3,
    points: 50,
    ingredients: [
    'Scones:',
    '1 ½ Tbsp ground flax',
    '3 Tbsp water',
    '3 cups whole-wheat flour',
    '2 tsp baking powder',
    '1 ½ tsp cinnamon',
    '½ tsp ground ginger',
    '½ tsp sea salt',
    '¼ tsp cloves',
    '¼ tsp nutmeg',
    '¼ tsp all spice',
    '7 Tbsp cold coconut oil',
    '1 cup maple syrup',
    '½ cup pumpkin purée',
    '½ cup non-dairy milk',
    '1 tsp vanilla extract',
    'Maple Glaze:',
    '1 ½ cups powdered sugar',
    '2 Tbsp non-dairy milk',
    '½ tsp maple extract',
    '¼ cup whole pecans',
    ],
    preparation: `Pre-heat oven to 425°F Combine ground flax with water and refrigerate
    for 10 minutes to set and thicken. In a large mixing bowl, combine whole-wheat
    flour, baking powder, sea salt and spices. In another mixing bowl combine maple
    syrup, pumpkin purée, non-dairy milk and vanilla extract, and set aside.
    Take 7 Tbsp of cold coconut oil and add to flour mixture. Using a pastry blender,
    cut the cold oil into the flour until it resembles a crumb-like texture.
    Add thickened flax mixture into bowl with liquid ingredients and stir to combine.
    Create a well in the middle of the dry mixture and pour in the liquid ingredients.
    Fold a few times until the dough just comes together, and then place it onto a
    lightly floured surface. Using your hands, shape dough into a long rectangle
    that’s approximately 1 ¼” thick and 4” wide. Make alternate diagonal cuts along
    the rectangle to cut out 12 triangles.
    Bake scones on a parchment lined baking sheet for 12-14 minutes.
    Once the scones are out of the oven, place on a wire rack to cool. Toast whole
    pecans for a few minutes on a baking sheet to get them golden brown and fragrant
    and once cool to touch, you can chop them into smaller pieces.
    To prepare the glaze, mix together with a whisk or hand mixer the powdered sugar,
    non-dairy milk and maple extract.
    To glaze the scones, dip the tops into the bowl of glaze and allow excess to
    drip a little. Place back onto the wire rack (some glaze will drip down the
    sides). Be sure to sprinkle with chopped pecans right away so they stick
    and allow them to dry.
    Store scones in airtight container at room temperature.`,
    price: 50,
  },
  {
    name: 'Vegan Meringues',
    foodProfile:  'vegan',
    imgUrl: 'http://likeavegan.com.au/wp-content/uploads/2016/07/little_pavlova_hires.jpg',
    duration: '180 min',
    level: 5,
    points: 100,
    ingredients: [
    '1 (15-oz) can chickpeas',
    '¼ tsp cream of tartar',
    'Kosher salt',
    '¾ cup superfine sugar',
    ],
    preparation: `Preheat the oven to 250ºF. Line 2 baking sheets with parchment.
    Strain the chickpeas directly into the bowl of a stand mixer. There should be
    about 3/4 cup liquid; reserve the chickpeas for another use. Add the cream of
    tartar and a pinch of salt to the liquid, and beat on medium-high speed until
    very foamy. While still beating, add the sugar, 1 tablespoon at a time, then
    continue to beat until the mixture forms stiff and glossy peaks, about 4 minutes.
    Transfer the mixture to a large pastry bag fitted with a large star or round
    tip, and pipe 2-inch mounds about 2 inches apart onto the prepared baking sheets.
    Bake until the meringues are set and no longer glossy, about 2 hours, rotating
    the trays (from top to bottom) halfway through. Turn the oven off, and let the
    meringues sit in the closed oven until they have dried out inside, about
    1 hour more. (The meringues will keep in an airtight container for up to 3 days.)`,
    price: 100,
  },
  {
    name: 'Chocolate Glazed Doughnuts',
    foodProfile: 'vegan',
    imgUrl: 'https://www.fivehearthome.com/wp-content/uploads/2016/12/Chocolate-Peppermint-Baked-Donuts-Holiday-Christmas-Breakfast-Dessert-Chocolate-Glaze-Candy-Canes-Recipe-by-Five-Heart-Home_700pxZoom2.jpg',
    duration: '30 min',
    level: 3,
    points: 50,
    ingredients: [
    'Nonstick spray',
    '1 Tbsp ground flax meal',
    '½ cup almond milk',
    '¼ cup grapeseed oil',
    '⅓ cup agave syrup',
    '1 tsp pure vanilla extract',
    '1 cup cake flour',
    '¼ cup unsweetened cocoa powder',
    '2 tsp baking powder',
    '½ tsp baking soda',
    '1 tsp fine salt',
    '⅓ cup vegan mini chocolate chips',
    'Chocolate Glaze',
    '½ cup vegan mini chocolate chips',
    '1 Tbsp grapeseed oil',
    'Sprinkles, for decorating',
    ],
    preparation: `DoughnutsPosition an oven rack in the center of the oven and
    preheat to 350ºF. Spray a doughnut pan lightly with nonstick spray. In a medium
    bowl, combine the flax meal and 2 tablespoons water, and let stand for 2 minutes
    to thicken. Add the almond milk, grapeseed oil, agave and vanilla, and whisk to combine.
    In another medium bowl, combine the cake flour, cocoa powder, baking powder,
    baking soda and salt, and whisk to incorporate. Add the flour mixture to the
    almond milk mixture and whisk together until the dry and wet ingredients are
    well combined. Stir in the chocolate chips with a spoon or spatula. Use a
    small cookie scoop or spoon to drop 2 to 3 heaping tablespoons of the batter
    into each doughnut mold, filling the molds two-thirds full.
    Bake the doughnuts until puffed and a toothpick inserted into the center comes
    out clean, 10 to 12 minutes. Allow to cool slightly while you make the glaze.
    Chocolate GlazeMelt the chocolate chips in a microwave in 30-second intervals
    or over a double boiler. Stir in the grapeseed oil until the chocolate is smooth.
    Dip each doughnut, top-side down, into the glaze; allow excess glaze to drip off,
    then decorate with sprinkles.
    Chill the doughnuts in the refrigerator for 30 minutes to allow the glaze to set.`,
    price: 50,
  },
];
