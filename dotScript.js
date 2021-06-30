

// import * as THREE from '../build/three.module.js';

// import Stats from './jsm/libs/stats.module.js';
// import { GUI } from './jsm/libs/dat.gui.module.js';
// import { OrbitControls } from "./jsm/controls/OrbitControls.js";

let camera, scene, renderer, stats;

let mesh;
const amount = parseInt( window.location.search.substr( 1 ) ) || 25;
const count = Math.pow( amount, 3 );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );
var gui = new dat.gui.GUI();

var changingState = new function() {
    this.switchOn = true;
    this.switchOff = false;
    this.transparent = false;
    this.dispose = false;
    this.transparency = 1.;
}

const onColor = new THREE.Color().setHex('0xcb2e0c');
const offColor = new THREE.Color().setHex('0x30a5c1');
const transparent = '0x1020ffff';

const materialOn = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHex(onColor),
    opacity: 1.,
    transparent: false,
});

const materialOff = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHex(offColor),
    opacity: .2,
    transparent: false,
});

const a_list = [[1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.6931595728485123, -2.8012432368996962, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.018901225984552728, -2.8012432368996962, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.7309620248176174, -2.8012432368996962, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, -1.9452128374831639, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, -0.23315203865009906, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, 1.4789087601829658, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, 3.1909695590160299, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.7309620248176167, 4.0469999584325613, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.01890122598455193, 4.0469999584325613, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.6931595728485123, 4.0469999584325613, 0.0, 1.0],
    [0.0, -1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, 3.1909695590160307, 0.0, 1.0],
    [0.0, -1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, 1.478908760182966, 0.0, 1.0],
    [0.0, -1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, -0.23315203865010084, 0.0, 1.0],
    [0.0, -1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, -1.9452128374831652, 0.0, 1.0],
    [0.83204898222110724, 0.55470216439529041, 0.0, 0.0, -0.55470216439529041, 0.83204898222110713, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.2848340046361844, 4.5122300630601915, 0.0, 1.0],
    [0.83204898222110679, 0.55470216439529085, 0.0, 0.0, -0.55470216439529085, 0.83204898222110679, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.6805171654402526, 5.4426902723154509, 0.0, 1.0],
    [0.83204898222110713, 0.55470216439529063, 0.0, 0.0, -0.55470216439529063, 0.83204898222110713, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.0762003262443205, 6.3731504815707112, 0.0, 1.0],
    [0.83204898222110713, 0.55470216439529041, 0.0, 0.0, -0.55470216439529041, 0.83204898222110713, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.4718834870483875, 7.3036106908259697, 0.0, 1.0],
    [0.83204898222110713, 0.55470216439529063, 0.0, 0.0, -0.55470216439529063, 0.83204898222110713, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.8675666478524562, 8.23407090008123, 0.0, 1.0],
    [0.77357143302412634, -0.63370911150858455, 0.0, 0.0, 0.63370911150858455, 0.77357143302412634, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.240795466933514, 8.1460243082383847, 0.0, 1.0],
    [0.77357143302412612, -0.63370911150858478, 0.0, 0.0, 0.63370911150858478, 0.77357143302412623, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.591569944291557, 7.0394709152974357, 0.0, 1.0],
    [0.77357143302412634, -0.63370911150858455, 0.0, 0.0, 0.63370911150858455, 0.77357143302412634, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 12.942344421649603, 5.9329175223564867, 0.0, 1.0],
    [0.77357143302412612, -0.63370911150858478, 0.0, 0.0, 0.63370911150858478, 0.77357143302412623, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.293118899007647, 4.8263641294155377, 0.0, 1.0],
    [0.7735714330241269, -0.63370911150858356, 0.0, 0.0, 0.63370911150858356, 0.7735714330241269, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.643893376365691, 3.7198107364745905, 0.0, 1.0],
    [-0.19481069402990892, -0.98084086043128593, 0.0, 0.0, 0.98084086043128593, -0.19481069402990889, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 16.152184841833424, 2.3252333979262816, 0.0, 1.0],
    [-0.19481069402990761, -0.98084086043128604, 0.0, 0.0, 0.98084086043128604, -0.19481069402990761, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.817993295410851, 0.64263211377061413, 0.0, 1.0],
    [-0.19481069402990889, -0.98084086043128593, 0.0, 0.0, 0.98084086043128593, -0.19481069402990889, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.483801748988277, -1.0399691703850538, 0.0, 1.0],
    [-0.19481069402990928, -0.98084086043128593, 0.0, 0.0, 0.98084086043128593, -0.1948106940299093, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.149610202565697, -2.7225704545407212, 0.0, 1.0],
    [-0.19481069402990756, -0.98084086043128604, 0.0, 0.0, 0.98084086043128604, -0.19481069402990758, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.815418656143123, -4.4051717386963878, 0.0, 1.0],
    [-0.19481069402991061, -0.98084086043128571, 0.0, 0.0, 0.98084086043128571, -0.19481069402991055, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.481227109720548, -6.0877730228520548, 0.0, 1.0],
    [-0.98507821530227702, -0.1721072623013935, 0.0, 0.0, 0.1721072623013935, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 13.351438681784026, -7.0972698494243138, 0.0, 1.0],
    [-0.98507821530227724, -0.17210726230139295, 0.0, 0.0, 0.17210726230139295, -0.98507821530227724, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.426053372333563, -7.4336622184131631, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139384, 0.0, 0.0, 0.17210726230139384, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.5006680628830935, -7.7700545874020124, 0.0, 1.0],
    [-0.98507821530227702, -0.1721072623013935, 0.0, 0.0, 0.1721072623013935, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.5752827534326279, -8.1064469563908634, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139362, 0.0, 0.0, 0.17210726230139364, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.6498974439821632, -8.4428393253797118, 0.0, 1.0],
    [0.54067946186778648, 0.84122869632125641, 0.0, 0.0, -0.84122869632125641, 0.54067946186778648, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.2157808542457875, -7.7886381646501626, 0.0, 1.0],
    [0.54067946186778704, 0.8412286963212563, 0.0, 0.0, -0.84122869632125619, 0.54067946186778704, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.2729329842234991, -6.1438434742022139, 0.0, 1.0],
    [0.54067946186778626, 0.84122869632125663, 0.0, 0.0, -0.84122869632125663, 0.54067946186778626, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.330085114201208, -4.4990487837542679, 0.0, 1.0],
    [0.5406794618677867, 0.8412286963212563, 0.0, 0.0, -0.8412286963212563, 0.5406794618677867, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.3872372441789196, -2.8542540933063187, 0.0, 1.0],
    [0.54067946186778693, 0.8412286963212563, 0.0, 0.0, -0.8412286963212563, 0.54067946186778693, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.444389374156632, -1.2094594028583705, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356374, 0.0, 0.0, -0.16185748854356374, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.306729058728834, -0.27778580937270719, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356388, 0.0, 0.0, -0.16185748854356388, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.9742562978955291, -0.059233312849324843, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356388, 0.0, 0.0, -0.16185748854356388, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.641783537062226, 0.15931918367405751, 0.0, 1.0],
    [-0.22268246109798817, -0.97489103058718474, 0.0, 0.0, 0.97489103058718474, -0.2226824610979882, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.8083479413136594, -0.46339313395572002, 0.0, 1.0],
    [-0.22268246109798873, -0.97489103058718451, 0.0, 0.0, 0.97489103058718451, -0.22268246109798873, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.473949510649831, -1.9273702657386491, 0.0, 1.0],
    [-0.22268246109798756, -0.97489103058718474, 0.0, 0.0, 0.97489103058718474, -0.22268246109798756, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.1395510799860036, -3.3913473975215753, 0.0, 1.0],
    [-0.87464047842197112, 0.48477214596734547, 0.0, 0.0, -0.48477214596734547, -0.87464047842197112, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.3760120045491071, -3.7928127817847073, 0.0, 1.0],
    [-0.87464047842197112, 0.48477214596734558, 0.0, 0.0, -0.48477214596734558, -0.87464047842197112, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.1833322843391372, -3.1317664185280343, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, -1.9452128374831625, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, -0.23315203865009543, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, 1.478908760182966, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.58699242423415, 3.1909695590160276, 0.0, 1.0],
    [-0.93347096714764877, -0.35865297084010545, 0.0, 0.0, 0.35865297084010545, -0.93347096714764877, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.1751512403021618, -4.4296319086989131, 0.0, 1.0],
    [-0.93347096714764843, -0.35865297084010589, 0.0, 0.0, 0.35865297084010589, -0.93347096714764843, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.5807499915983056, -5.0422237992706576, 0.0, 1.0],
    [-0.93347096714764843, -0.35865297084010567, 0.0, 0.0, 0.35865297084010572, -0.93347096714764843, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.9863487428944494, -5.6548156898424011, 0.0, 1.0],
    [-0.93347096714764877, -0.35865297084010528, 0.0, 0.0, 0.35865297084010522, -0.93347096714764877, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.60805250580940651, -6.2674075804141447, 0.0, 1.0],
    [-0.93347096714764843, -0.35865297084010578, 0.0, 0.0, 0.35865297084010578, -0.93347096714764843, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.2024537545132623, -6.8799994709858883, 0.0, 1.0],
    [0.55894410324909383, -0.8292053361158902, 0.0, 0.0, 0.8292053361158902, 0.55894410324909383, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.56925478665881, -7.824802265964002, 0.0, 1.0],
    [0.55894410324909383, -0.82920533611589031, 0.0, 0.0, 0.82920533611589031, 0.55894410324909383, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.7084556022460484, -9.101815965348484, 0.0, 1.0],
    [0.55894410324909394, -0.8292053361158902, 0.0, 0.0, 0.8292053361158902, 0.55894410324909383, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.84765641783328705, -10.378829664732969, 0.0, 1.0],
    [0.55894410324909416, -0.82920533611588998, 0.0, 0.0, 0.82920533611588998, 0.55894410324909416, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.013142766579474508, -11.655843364117452, 0.0, 1.0],
    [0.75520674961110168, 0.65548666297784808, 0.0, 0.0, -0.65548666297784808, 0.75520674961110168, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.1508194305310357, -11.680464429820432, 0.0, 1.0],
    [0.75520674961110135, 0.65548666297784819, 0.0, 0.0, -0.65548666297784819, 0.75520674961110135, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.5653735740213937, -10.452692861841914, 0.0, 1.0],
    [0.75520674961110201, 0.65548666297784752, 0.0, 0.0, -0.65548666297784752, 0.75520674961110201, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.9799277175117513, -9.224921293863396, 0.0, 1.0],
    [0.54067946186778604, 0.84122869632125674, 0.0, 0.0, -0.84122869632125674, 0.54067946186778604, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.2157808542457866, -7.7886381646501626, 0.0, 1.0],
    [0.54067946186778737, 0.84122869632125585, 0.0, 0.0, -0.84122869632125585, 0.54067946186778737, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.2729329842234982, -6.1438434742022139, 0.0, 1.0],
    [0.54067946186778637, 0.84122869632125652, 0.0, 0.0, -0.84122869632125652, 0.54067946186778637, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.330085114201208, -4.4990487837542679, 0.0, 1.0],
    [0.54067946186778648, 0.84122869632125641, 0.0, 0.0, -0.84122869632125641, 0.54067946186778648, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.3872372441789196, -2.8542540933063196, 0.0, 1.0],
    [0.54067946186778715, 0.84122869632125619, 0.0, 0.0, -0.84122869632125619, 0.54067946186778704, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.4443893741566303, -1.2094594028583723, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356388, 0.0, 0.0, -0.16185748854356388, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.3067290587288323, -0.27778580937270675, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356372, 0.0, 0.0, -0.16185748854356372, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.9742562978955283, -0.059233312849324385, 0.0, 1.0],
    [-0.98681414329263151, 0.16185748854356388, 0.0, 0.0, -0.16185748854356388, -0.98681414329263151, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.641783537062226, 0.15931918367405751, 0.0, 1.0],
    [-0.22268246109798837, -0.97489103058718451, 0.0, 0.0, 0.97489103058718451, -0.22268246109798834, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.8083479413136594, -0.46339313395571918, 0.0, 1.0],
    [-0.22268246109798823, -0.97489103058718451, 0.0, 0.0, 0.97489103058718474, -0.22268246109798825, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.473949510649831, -1.9273702657386491, 0.0, 1.0],
    [-0.22268246109798781, -0.97489103058718474, 0.0, 0.0, 0.97489103058718474, -0.22268246109798781, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.1395510799860036, -3.3913473975215767, 0.0, 1.0],
    [-0.96144294966721999, -0.2750044627550533, 0.0, 0.0, 0.2750044627550533, -0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.4145110057065318, -3.0487536544388654, 0.0, 1.0],
    [-0.96144294966721999, -0.27500446275505352, 0.0, 0.0, 0.27500446275505352, -0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.1451530725895056, -3.5437744895172032, 0.0, 1.0],
    [-0.96144294966721999, -0.2750044627550533, 0.0, 0.0, 0.2750044627550533, -0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.875795139472479, -4.0387953245955401, 0.0, 1.0],
    [-0.96144294966721999, -0.2750044627550533, 0.0, 0.0, 0.2750044627550533, -0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.6064372063554551, -4.5338161596738784, 0.0, 1.0],
    [-0.96144294966721999, -0.27500446275505352, 0.0, 0.0, 0.27500446275505352, -0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.337079273238428, -5.0288369947522158, 0.0, 1.0],
    [0.31176406943712831, -0.95015954713300721, 0.0, 0.0, 0.95015954713300721, 0.31176406943712831, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.929539747802458, -6.1079412053848117, 0.0, 1.0],
    [0.31176406943712859, -0.95015954713300721, 0.0, 0.0, 0.95015954713300721, 0.31176406943712859, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.383818630047543, -7.7711287915716625, 0.0, 1.0],
    [0.98073508596074177, 0.19534249708032361, 0.0, 0.0, -0.19534249708032361, 0.98073508596074177, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.222045109631976, -8.4256691886159221, 0.0, 1.0],
    [0.98073508596074199, 0.19534249708032306, 0.0, 0.0, -0.19534249708032306, 0.98073508596074199, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.4442191865557508, -8.0715623965175904, 0.0, 1.0],
    [0.98073508596074199, 0.19534249708032303, 0.0, 0.0, -0.19534249708032303, 0.98073508596074199, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.6663932634795273, -7.717455604419257, 0.0, 1.0],
    [0.98073508596074199, 0.19534249708032317, 0.0, 0.0, -0.19534249708032317, 0.98073508596074199, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.8885673404033039, -7.3633488123209263, 0.0, 1.0],
    [0.93347096714764843, 0.35865297084010545, 0.0, 0.0, -0.3586529708401055, 0.93347096714764866, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.2024537545132614, -6.8799994709858883, 0.0, 1.0],
    [0.93347096714764832, 0.358652970840106, 0.0, 0.0, -0.358652970840106, 0.93347096714764832, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.60805250580940517, -6.2674075804141438, 0.0, 1.0],
    [0.93347096714764877, 0.35865297084010545, 0.0, 0.0, -0.35865297084010545, 0.93347096714764877, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.98634874289444974, -5.6548156898424011, 0.0, 1.0],
    [0.93347096714764877, 0.3586529708401055, 0.0, 0.0, -0.3586529708401055, 0.93347096714764877, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.5807499915983061, -5.0422237992706576, 0.0, 1.0],
    [0.93347096714764843, 0.35865297084010561, 0.0, 0.0, -0.35865297084010567, 0.93347096714764843, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.1751512403021627, -4.4296319086989131, 0.0, 1.0],
    [-0.87464047842197112, 0.4847721459673453, 0.0, 0.0, -0.4847721459673453, -0.87464047842197112, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.3760120045491062, -3.7928127817847059, 0.0, 1.0],
    [-0.87464047842197101, 0.48477214596734569, 0.0, 0.0, -0.48477214596734569, -0.87464047842197101, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.1833322843391358, -3.1317664185280334, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.7309620248176167, -2.8012432368996962, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.018901225984552728, -2.8012432368996962, 0.0, 1.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.6931595728485112, -2.8012432368996962, 0.0, 1.0],
    [-0.98073508596074177, -0.19534249708032345, 0.0, 0.0, 0.19534249708032347, -0.98073508596074177, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.8885673404033021, -7.3633488123209263, 0.0, 1.0],
    [-0.98073508596074199, -0.19534249708032256, 0.0, 0.0, 0.19534249708032256, -0.98073508596074199, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.6663932634795264, -7.717455604419257, 0.0, 1.0],
    [-0.98073508596074177, -0.19534249708032347, 0.0, 0.0, 0.19534249708032347, -0.98073508596074177, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.4442191865557508, -8.0715623965175904, 0.0, 1.0],
    [-0.98073508596074177, -0.19534249708032331, 0.0, 0.0, 0.19534249708032331, -0.98073508596074177, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.2220451096319742, -8.4256691886159221, 0.0, 1.0],
    [-0.16894815214637768, -0.98562493976477905, 0.0, 0.0, 0.98562493976477905, -0.16894815214637771, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.251919334474785, -9.425075092749859, 0.0, 1.0],
    [-0.16894815214637698, -0.98562493976477905, 0.0, 0.0, 0.98562493976477905, -0.16894815214637698, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.533841861084182, -11.069780108919401, 0.0, 1.0],
    [-0.16894815214637782, -0.98562493976477905, 0.0, 0.0, 0.98562493976477905, -0.16894815214637784, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.81576438769358, -12.71448512508894, 0.0, 1.0],
    [-0.16894815214637685, -0.98562493976477938, 0.0, 0.0, 0.98562493976477938, -0.16894815214637685, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -11.097686914302978, -14.35919014125848, 0.0, 1.0],
    [0.7317145855976469, -0.68161115397539085, 0.0, 0.0, 0.68161115397539085, 0.7317145855976469, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.554914674553439, -15.818458177886095, 0.0, 1.0],
    [0.7317145855976469, -0.68161115397539085, 0.0, 0.0, 0.68161115397539085, 0.7317145855976469, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.1874476684449693, -17.092289234971787, 0.0, 1.0],
    [0.73171458559764646, -0.68161115397539129, 0.0, 0.0, 0.68161115397539129, 0.73171458559764646, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.8199806623364969, -18.366120292057477, 0.0, 1.0],
    [0.73171458559764746, -0.68161115397539007, 0.0, 0.0, 0.68161115397539007, 0.73171458559764746, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.4525136562280245, -19.639951349143168, 0.0, 1.0],
    [0.97522437798105233, 0.22121802049441913, 0.0, 0.0, -0.22121802049441913, 0.97522437798105233, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.9114328271405867, -20.082387860730048, 0.0, 1.0],
    [0.97522437798105321, 0.22121802049441613, 0.0, 0.0, -0.22121802049441613, 0.97522437798105321, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.1967381750741879, -19.693429826818118, 0.0, 1.0],
    [0.97522437798105277, 0.22121802049441772, 0.0, 0.0, -0.22121802049441772, 0.97522437798105277, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.4820435230077895, -19.304471792906195, 0.0, 1.0],
    [0.15484301221865826, 0.98793908798419983, 0.0, 0.0, -0.98793908798419983, 0.15484301221865823, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.49116637750453462, -18.258037455682665, 0.0, 1.0],
    [0.15484301221865826, 0.98793908798419983, 0.0, 0.0, -0.98793908798419983, 0.15484301221865823, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.22410673856442306, -16.55412681514753, 0.0, 1.0],
    [0.15484301221865801, 0.98793908798419983, 0.0, 0.0, -0.98793908798419983, 0.15484301221865801, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.04295290037568851, -14.850216174612394, 0.0, 1.0],
    [0.15484301221865826, 0.98793908798419983, 0.0, 0.0, -0.98793908798419983, 0.15484301221865823, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.31001253931580008, -13.146305534077261, 0.0, 1.0],
    [-0.75520674961110112, -0.65548666297784863, 0.0, 0.0, 0.65548666297784863, -0.75520674961110101, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.9799277175117527, -9.2249212938633978, 0.0, 1.0],
    [-0.75520674961110212, -0.65548666297784741, 0.0, 0.0, 0.65548666297784741, -0.75520674961110212, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.5653735740213941, -10.452692861841918, 0.0, 1.0],
    [-0.75520674961110168, -0.65548666297784786, 0.0, 0.0, 0.65548666297784786, -0.75520674961110168, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.1508194305310353, -11.680464429820434, 0.0, 1.0],
    [-0.15484301221865829, -0.98793908798419983, 0.0, 0.0, 0.98793908798419983, -0.15484301221865829, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.31001253931580008, -13.146305534077261, 0.0, 1.0],
    [-0.1548430122186582, -0.98793908798419983, 0.0, 0.0, 0.98793908798419983, -0.15484301221865818, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.042952900375688531, -14.850216174612394, 0.0, 1.0],
    [-0.15484301221865834, -0.98793908798419983, 0.0, 0.0, 0.98793908798419983, -0.15484301221865832, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.22410673856442306, -16.554126815147526, 0.0, 1.0],
    [-0.15484301221865798, -0.98793908798419983, 0.0, 0.0, 0.98793908798419983, -0.15484301221865798, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.49116637750453462, -18.258037455682661, 0.0, 1.0],
    [0.86385057081997807, -0.50374814272014767, 0.0, 0.0, 0.50374814272014767, 0.86385057081997807, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.074813060143837137, -19.517906483473141, 0.0, 1.0],
    [0.86385057081997807, -0.50374814272014756, 0.0, 0.0, 0.50374814272014756, 0.86385057081997807, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.4738315743806922, -20.333733898518958, 0.0, 1.0],
    [0.86385057081997674, -0.50374814272014967, 0.0, 0.0, 0.50374814272014967, 0.86385057081997674, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.8728500886175485, -21.149561313564774, 0.0, 1.0],
    [0.86385057081997807, -0.50374814272014756, 0.0, 0.0, 0.50374814272014756, 0.86385057081997807, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.2718686028544042, -21.965388728610595, 0.0, 1.0],
    [0.8638505708199774, -0.50374814272014889, 0.0, 0.0, 0.50374814272014889, 0.8638505708199774, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.6708871170912607, -22.781216143656412, 0.0, 1.0],
    [0.8765673624064938, 0.48127919045365192, 0.0, 0.0, -0.48127919045365192, 0.8765673624064938, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.1133411135319369, -22.781216143656412, 0.0, 1.0],
    [0.8765673624064938, 0.48127919045365192, 0.0, 0.0, -0.48127919045365192, 0.8765673624064938, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.5992305921764309, -21.965388728610595, 0.0, 1.0],
    [0.8765673624064938, 0.48127919045365175, 0.0, 0.0, -0.48127919045365175, 0.8765673624064938, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.085120070820933, -21.149561313564774, 0.0, 1.0],
    [0.87656736240649369, 0.48127919045365203, 0.0, 0.0, -0.48127919045365208, 0.87656736240649369, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.571009549465428, -20.333733898518954, 0.0, 1.0],
    [0.8765673624064948, 0.48127919045365036, 0.0, 0.0, -0.48127919045365025, 0.87656736240649458, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 13.056899028109923, -19.517906483473137, 0.0, 1.0],
    [0.56647986661057803, 0.82407557949793775, 0.0, 0.0, -0.82407557949793775, 0.56647986661057803, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.268359566895493, -18.428428519736173, 0.0, 1.0],
    [0.5664798666105777, 0.82407557949793797, 0.0, 0.0, -0.82407557949793797, 0.5664798666105777, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.20539116582213, -17.065300007308064, 0.0, 1.0],
    [0.56647986661057836, 0.82407557949793742, 0.0, 0.0, -0.82407557949793742, 0.56647986661057836, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 16.142422764748769, -15.702171494879957, 0.0, 1.0],
    [0.56647986661057936, 0.82407557949793686, 0.0, 0.0, -0.82407557949793664, 0.56647986661057925, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 17.07945436367541, -14.339042982451856, 0.0, 1.0],
    [0.56647986661057947, 0.82407557949793653, 0.0, 0.0, -0.82407557949793653, 0.56647986661057947, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 18.016485962602054, -12.975914470023747, 0.0, 1.0],
    [-0.61374599601780244, 0.78950354804276546, 0.0, 0.0, -0.78950354804276557, -0.61374599601780266, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 17.96364295887086, -11.623690645199718, 0.0, 1.0],
    [-0.61374599601780233, 0.78950354804276579, 0.0, 0.0, -0.78950354804276579, -0.61374599601780233, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 16.920925352481831, -10.282371507979768, 0.0, 1.0],
    [-0.61374599601780244, 0.78950354804276546, 0.0, 0.0, -0.78950354804276557, -0.61374599601780266, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.878207746092802, -8.9410523707598166, 0.0, 1.0],
    [-0.613745996017803, 0.78950354804276524, 0.0, 0.0, -0.78950354804276524, -0.613745996017803, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.835490139703774, -7.5997332335398653, 0.0, 1.0],
    [-0.98507821530227724, -0.17210726230139314, 0.0, 0.0, 0.17210726230139314, -0.98507821530227724, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 13.351438681784025, -7.0972698494243138, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139362, 0.0, 0.0, 0.17210726230139364, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.426053372333556, -7.4336622184131649, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139325, 0.0, 0.0, 0.17210726230139323, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.5006680628830917, -7.7700545874020124, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139375, 0.0, 0.0, 0.17210726230139378, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.5752827534326261, -8.1064469563908634, 0.0, 1.0],
    [-0.98507821530227702, -0.17210726230139362, 0.0, 0.0, 0.17210726230139364, -0.98507821530227702, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.6498974439821632, -8.4428393253797118, 0.0, 1.0],
    [-0.81307498262710998, 0.58215897538896089, 0.0, 0.0, -0.58215897538896089, -0.81307498262710998, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.229929924020472, 4.5344074931470066, 0.0, 1.0],
    [-0.81307498262710964, 0.58215897538896144, 0.0, 0.0, -0.58215897538896144, -0.81307498262710964, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.5914098275313266, 5.509222562575899, 0.0, 1.0],
    [-0.81307498262711009, 0.58215897538896111, 0.0, 0.0, -0.58215897538896111, -0.81307498262711009, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.9528897310421804, 6.4840376320047897, 0.0, 1.0],
    [-0.81307498262710998, 0.58215897538896089, 0.0, 0.0, -0.58215897538896089, -0.81307498262710998, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.3143696345530351, 7.4588527014336812, 0.0, 1.0],
    [-0.97401462461976973, -0.22648512319092576, 0.0, 0.0, 0.22648512319092573, -0.97401462461976973, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.9631037400164306, 7.7211750376212258, 0.0, 1.0],
    [-0.97401462461976973, -0.22648512319092645, 0.0, 0.0, 0.22648512319092645, -0.97401462461976973, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.899092047432365, 7.2710046405674253, 0.0, 1.0],
    [-0.97401462461976973, -0.22648512319092629, 0.0, 0.0, 0.22648512319092629, -0.97401462461976973, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -12.835080354848301, 6.8208342435136231, 0.0, 1.0],
    [-0.97401462461976973, -0.22648512319092695, 0.0, 0.0, 0.22648512319092695, -0.97401462461976973, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -14.771068662264236, 6.3706638464598218, 0.0, 1.0],
    [-0.97401462461976973, -0.22648512319092629, 0.0, 0.0, 0.22648512319092629, -0.97401462461976973, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -16.707056969680171, 5.9204934494060204, 0.0, 1.0],
    [-0.29528712858527395, -0.95540855747259446, 0.0, 0.0, 0.95540855747259446, -0.29528712858527401, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -17.947669659151245, 4.8133444669221248, 0.0, 1.0],
    [-0.29528712858527539, -0.95540855747259412, 0.0, 0.0, 0.95540855747259412, -0.29528712858527539, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.492906730677465, 3.0492168990081385, 0.0, 1.0],
    [-0.29528712858527395, -0.95540855747259446, 0.0, 0.0, 0.95540855747259446, -0.29528712858527401, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -19.038143802203685, 1.2850893310941514, 0.0, 1.0],
    [-0.29528712858527401, -0.95540855747259446, 0.0, 0.0, 0.95540855747259446, -0.29528712858527401, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -19.583380873729897, -0.47903823681983604, 0.0, 1.0],
    [0.91108728369782366, -0.41221349017726422, 0.0, 0.0, 0.41221349017726422, 0.91108728369782366, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.990639499211699, -1.7526265599282853, 0.0, 1.0],
    [0.91108728369782421, -0.41221349017726283, 0.0, 0.0, 0.41221349017726283, 0.91108728369782421, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -17.25991967864908, -2.5356756382311967, 0.0, 1.0],
    [0.91108728369782377, -0.4122134901772635, 0.0, 0.0, 0.4122134901772635, 0.91108728369782377, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -15.529199858086464, -3.3187247165341081, 0.0, 1.0],
    [0.91108728369782377, -0.4122134901772635, 0.0, 0.0, 0.4122134901772635, 0.91108728369782377, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -13.798480037523843, -4.1017737948370181, 0.0, 1.0],
    [0.91108728369782421, -0.41221349017726266, 0.0, 0.0, 0.41221349017726266, 0.91108728369782421, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -12.067760216961226, -4.8848228731399299, 0.0, 1.0],
    [0.96144294966721999, 0.27500446275505369, 0.0, 0.0, -0.27500446275505369, 0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.337079273238428, -5.0288369947522158, 0.0, 1.0],
    [0.96144294966722021, 0.27500446275505297, 0.0, 0.0, -0.27500446275505297, 0.96144294966722021, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.6064372063554515, -4.5338161596738784, 0.0, 1.0],
    [0.96144294966721999, 0.27500446275505358, 0.0, 0.0, -0.27500446275505358, 0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.8757951394724763, -4.0387953245955401, 0.0, 1.0],
    [0.96144294966721999, 0.27500446275505336, 0.0, 0.0, -0.27500446275505336, 0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.1451530725895029, -3.5437744895172019, 0.0, 1.0],
    [0.96144294966721999, 0.27500446275505352, 0.0, 0.0, -0.27500446275505352, 0.96144294966721999, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.4145110057065313, -3.0487536544388654, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, -1.9452128374831625, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, -0.23315203865009818, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, 1.4789087601829634, 0.0, 1.0],
    [0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.5491899722650446, 3.1909695590160276, 0.0, 1.0]]
;


const color = new THREE.Color();

init();
animate();
gui = initUi(gui);

function initUi(gui) {
    gui = new dat.gui.GUI();

    console.log(mesh.count);
    console.log(amount);

    gui.add( mesh, 'count', 0, amount ).onChange( function () {
        mesh.count = parseInt(mesh.count) * amount * amount;
    });
    // gui.add(changingState, 'transparency', 0., 1.).onChange( function () {
    //     // init();
    // });
    gui.add(changingState, 'switchOn').onChange( function () {
        changingState.switchOff=false;
        gui.__controllers[2].updateDisplay();
    });
    gui.add(changingState, 'switchOff').onChange( function () {
        changingState.switchOn=false;
        gui.__controllers[1].updateDisplay();
    });
    gui.add(changingState, 'dispose');
    gui.add(changingState, 'transparent');

    return gui;
}

const spacing = 1.;

// birck from matrix
function brickFromMatrix(mesh) {
    let i = 0;
    const matrix = new THREE.Matrix4();

    console.log(matrix);

    // console.log(a_list);
    a_list.forEach((thisMatrix) => {
        matrix.elements = thisMatrix;
        if (i == 2) {
            console.log(thisMatrix);
            console.log(matrix);
        }


        mesh.setMatrixAt(i, matrix);
        mesh.setColorAt(i, color);

        i++;
    })

    // console.log(i);
    return mesh;
}

// brick grid
function brickGrid(count, spacing) {
    meshA = THREE.BoxGeometry(spacing*2.-.1, spacing, spacing-.1);
    meshB = THREE.BoxGeometry(spacing-.1, spacing, spacing*2.-.1);

    for (let i = 0; i < count; i++) {
        var direction = i % 2;
        var z = i * spacing;
        var inset = 0;
        if (i % 4 === 1 || i % 4 === 2 ) {
            inset = 1;
        }
        if (direction === 1) {
            for (let j = 0; j < count; j++) {
                x = (j + inset) * spacing * 2.;
                for (let k = 0; k < count * 2; k++) {
                    y = k * spacing;
                    if (direction == 1) {

                    }

                }
            }
        }

    }
}


function newMesh(mesh) {
    let i = 0;
    const offset = ( amount - 1 ) / 2;

    const matrix = new THREE.Matrix4();

    for ( let x = 0; x < amount; x ++ ) {
        for ( let y = 0; y < amount; y ++ ) {
            for ( let z = 0; z < amount; z ++ ) {

                if (x % 4 === 0) {
                    matrix.makeRotationX(.2 * Math.PI);
                } else {
                    matrix.makeRotationX(0.);
                }

                if (x % 4 === 3) {
                    matrix.scale(new THREE.Vector3(1., .5, 1.));
                } else {
                    matrix.scale(new THREE.Vector3(1., 1., 1.));
                }

                matrix.setPosition( y - offset, x - offset, offset - z );

                mesh.setMatrixAt( i, matrix );
                mesh.setColorAt( i, color );

                i ++;

            }

        }

    }
    return mesh;

}

function init() {

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100 );
    camera.position.set( amount, amount, amount );
    camera.lookAt( 0, 0, 0 );

    scene = new THREE.Scene();

    const light1 = new THREE.HemisphereLight( 0xffffff, 0x000088 );
    light1.position.set( - 1, 1.5, 1 );
    scene.add( light1 );

    const light2 = new THREE.HemisphereLight( 0xffffff, 0x880000, 0.5 );
    light2.position.set( - 1, - 1.5, - 1 );
    scene.add( light2 );

    const geometry = new THREE.BoxGeometry(.9, .9, .9);
    const material = new THREE.MeshPhongMaterial({
        color,
        opacity: 1.,
        transparent: false,
    });

    mesh = new THREE.InstancedMesh( geometry, material, count );

    mesh = brickFromMatrix(mesh);

    scene.add( mesh );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight);
    renderer.setPixelRatio( window.devicePixelRatio );

    const canvas = document.body.appendChild( renderer.domElement );

    new THREE.OrbitControls( camera, renderer.domElement );

    // stats = new Stats();
    // console.log(stats);
    // document.body.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize );
    document.addEventListener( 'mousemove', onMouseMove );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    raycaster.setFromCamera( mouse, camera );

    const intersection = raycaster.intersectObject( mesh );


    if ( intersection.length > 0) {

        const instanceId = intersection[ 0 ].instanceId;

        if (changingState.switchOn) {
            mesh.setColorAt( instanceId, onColor );
            mesh.instanceColor.needsUpdate = true;
        } else if (changingState.switchOff){
            mesh.setColorAt( instanceId, offColor );
            mesh.instanceColor.needsUpdate = true;
        } else if (changingState.dispose) {
            console.log(instanceId);
            mesh.dispose();
            mesh.instanceColor.needsUpdate = true;
        }


    }

    renderer.render( scene, camera );

    // stats.update();

}

