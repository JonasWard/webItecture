

// import * as THREE from '../build/three.module.js';

// import Stats from './jsm/libs/stats.module.js';
// import { GUI } from './jsm/libs/dat.gui.module.js';
// import { OrbitControls } from "./jsm/controls/OrbitControls.js";

// loading mesh
// Load a glTF resource
const loader = new THREE.GLTFLoader();
const dracoLoader = new THREE.DRACOLoader();

const meshPlane = [[0.94971302264071933, -0.31312166106264266, 0.0, 0.0, 0.31312166106264266, 0.94971302264071933, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -15.95856384008637, -7.6880890922682283, 0.0, 1.0],
    [0.99813265711724297, 0.061083539485463911, 0.0, 0.0, -0.061083539485463911, 0.99813265711724297, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -19.81807270697783, -7.1912411273194072, 0.0, 1.0],
    [0.98872637925064488, -0.14973358665947287, 0.0, 0.0, 0.14973358665947287, 0.98872637925064488, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -23.665817230630399, -7.0304612837940175, 0.0, 1.0],
    [0.39253652416013179, -0.91973641724152799, 0.0, 0.0, 0.91973641724152799, 0.39253652416013179, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -26.301877058633206, -4.9381100546279342, 0.0, 1.0],
    [0.0084771110921412068, -0.99996406864823484, 0.0, 0.0, 0.99996406864823484, 0.0084771110921412068, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -27.091234551936441, -1.1458388206275019, 0.0, 1.0],
    [-0.33842750873594185, -0.94099246613922671, 0.0, 0.0, 0.94099246613922671, -0.33842750873594185, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -26.437236063473179, 2.7014462683763072, 0.0, 1.0],
    [-0.60866971039449158, -0.79342371003662715, 0.0, 0.0, 0.79342371003662715, -0.60866971039449158, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -24.557256241937512, 6.1428091077661762, 0.0, 1.0],
    [-0.76793793348567341, -0.64052426208048796, 0.0, 0.0, 0.64052426208048796, -0.76793793348567341, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -21.820417326626458, 8.9932143735076107, 0.0, 1.0],
    [-0.86245667863769859, -0.50613088966514352, 0.0, 0.0, 0.50613088966514352, -0.86245667863769859, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.576029829680756, 11.274868333986625, 0.0, 1.0],
    [-0.91752249075034176, -0.39768389327113668, 0.0, 0.0, 0.39768389327113668, -0.91752249075034176, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -15.032089125786502, 13.074299358087877, 0.0, 1.0],
    [-0.9453024720516684, -0.32619508937598163, 0.0, 0.0, 0.32619508937598163, -0.9453024720516684, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -11.321914606107862, 14.516025277066479, 0.0, 1.0],
    [-0.96137583079788547, -0.27523900878631924, 0.0, 0.0, 0.27523900878631924, -0.96137583079788547, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.5238502547876456, 15.714066056600306, 0.0, 1.0],
    [-0.97259743087178563, -0.23249567192015061, 0.0, 0.0, 0.23249567192015061, -0.97259743087178563, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.6712595194002313, 16.725503316088783, 0.0, 1.0],
    [-0.98298897944983432, -0.18366454823991721, 0.0, 0.0, 0.18366454823991718, -0.98298897944983432, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.22424643938812139, 17.554494126590622, 0.0, 1.0],
    [-0.99530414400649769, -0.096797008856124939, 0.0, 0.0, 0.096797008856124939, -0.99530414400649769, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.1640199947758445, 18.113069124495073, 0.0, 1.0],
    [-0.99933847757769512, 0.036367667407937392, 0.0, 0.0, -0.036367667407937392, -0.99933847757769512, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.1347754214474275, 18.233418853016477, 0.0, 1.0],
    [-0.97061253476141263, 0.24064768306390447, 0.0, 0.0, -0.24064768306390447, -0.97061253476141263, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 12.052563985230513, 17.682823968774603, 0.0, 1.0],
    [-0.8334539033779591, 0.55258898916287102, 0.0, 0.0, -0.55258898916287102, -0.83345390337795922, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.60744053300532, 16.126497599217114, 0.0, 1.0],
    [0.83569240246202059, 0.54919778629129257, 0.0, 0.0, -0.54919778629129257, 0.83569240246202059, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.709324081597643, 14.046710176924059, 0.0, 1.0],
    [0.98742872285477745, 0.15806491477042939, 0.0, 0.0, -0.15806491477042939, 0.98742872285477745, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 12.219677096313493, 12.7304149039145, 0.0, 1.0],
    [0.9976528602395166, 0.068474597157715755, 0.0, 0.0, -0.068474597157715769, 0.9976528602395166, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.2667631230221996, 12.27938080073608, 0.0, 1.0],
    [0.99432589950155148, 0.1063767154053492, 0.0, 0.0, -0.10637671540534918, 0.99432589950155148, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.2992211115563448, 11.931133978954803, 0.0, 1.0],
    [0.96732550190537625, 0.2535377158600115, 0.0, 0.0, -0.2535377158600115, 0.96732550190537625, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.39455815738593547, 11.214859388251577, 0.0, 1.0],
    [0.9117773583702683, 0.4106848533405334, 0.0, 0.0, -0.4106848533405334, 0.9117773583702683, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.3445162188676991, 9.8931373861063197, 0.0, 1.0],
    [0.81670123679841511, 0.57706073320919971, 0.0, 0.0, -0.57706073320919971, 0.81670123679841511, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.7818928950458544, 7.9291570448300961, 0.0, 1.0],
    [0.45398827030555317, 0.8910076601382122, 0.0, 0.0, -0.8910076601382122, 0.45398827030555317, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.2789873696494283, 5.0667371278801472, 0.0, 1.0],
    [-0.60775952090152807, 0.79412112725549933, 0.0, 0.0, -0.79412112725549933, -0.60775952090152807, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.9835627350127716, 1.8227415932491107, 0.0, 1.0],
    [-0.94011449950491222, 0.34085880921670259, 0.0, 0.0, -0.34085880921670259, -0.94011449950491222, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.9447360934316142, -0.38325168671602361, 0.0, 1.0],
    [-0.96364029971495868, 0.26720286818308081, 0.0, 0.0, -0.26720286818308081, -0.96364029971495868, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.1561302672479328, -1.5931929625726, 0.0, 1.0],
    [-0.99079670400210229, 0.13535838111683537, 0.0, 0.0, -0.13535838111683537, -0.99079670400210229, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.7331384617652827, -2.3945288757958911, 0.0, 1.0],
    [-0.94437866023940031, -0.32886007067510487, 0.0, 0.0, 0.32886007067510487, -0.94437866023940031, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.5338662586012042, -2.0260843308836534, 0.0, 1.0],
    [-0.547848783266771, -0.83657737877205285, 0.0, 0.0, 0.83657737877205285, -0.547848783266771, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.4506645093992017, 0.26972442183966949, 0.0, 1.0],
    [-0.50865957606282508, -0.86096773207803035, 0.0, 0.0, 0.86096773207803035, -0.50865957606282508, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.5484979770713, 3.6407315547024726, 0.0, 1.0],
    [-0.6810660635790925, -0.73222197251986332, 0.0, 0.0, 0.73222197251986332, -0.6810660635790925, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 12.914107714223206, 6.8088814405359814, 0.0, 1.0],
    [-0.90505627137407085, -0.42529183585682034, 0.0, 0.0, 0.42529183585682034, -0.90505627137407085, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 16.037151794260321, 9.0956940140136151, 0.0, 1.0],
    [-0.87385993849933541, 0.48617775338443636, 0.0, 0.0, -0.48617775338443636, -0.87385993849933541, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 19.485037618313019, 8.9932392978890334, 0.0, 1.0],
    [-0.31940442516883538, 0.94761849558910882, 0.0, 0.0, -0.94761849558910882, -0.31940442516883538, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.790479177790438, 6.1994976547243326, 0.0, 1.0],
    [0.21649383821685703, 0.97628398430688867, 0.0, 0.0, -0.97628398430688867, 0.21649383821685703, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.990333073368749, 2.4139156164084499, 0.0, 1.0],
    [0.1811492767149199, 0.98345561137534898, 0.0, 0.0, -0.98345561137534898, 0.1811492767149199, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.20791886486996, -1.4411566741402064, 0.0, 1.0],
    [-0.35003134922980877, 0.93673798607527359, 0.0, 0.0, -0.93673798607527359, -0.35003134922980877, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.547393593011108, -5.2300553916524883, 0.0, 1.0],
    [-0.46376417012077759, 0.88595868668476085, 0.0, 0.0, -0.88595868668476085, -0.46376417012077759, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 23.166146261418632, -8.8545769169566793, 0.0, 1.0],
    [-0.30953497716527495, 0.95088805750797656, 0.0, 0.0, -0.95088805750797656, -0.30953497716527495, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 24.702463161162996, -12.500904601032651, 0.0, 1.0],
    [0.39294130054723525, 0.91956355643546872, 0.0, 0.0, -0.91956355643546872, 0.39294130054723525, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 24.557773026897639, -16.154046481822039, 0.0, 1.0],
    [0.90010505991849765, 0.43567290609942438, 0.0, 0.0, -0.43567290609942438, 0.90010505991849765, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 22.035865957193977, -18.780045313439086, 0.0, 1.0],
    [0.98618639132613262, -0.16563937201988024, 0.0, 0.0, 0.16563937201988024, 0.98618639132613251, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 18.332509032377754, -19.308650623596407, 0.0, 1.0],
    [0.83453990267504097, -0.55094750280143134, 0.0, 0.0, 0.55094750280143134, 0.83453990267504108, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.738142144605938, -17.889918643599568, 0.0, 1.0],
    [0.61845364367961053, -0.78582128414761909, 0.0, 0.0, 0.78582128414761909, 0.61845364367961064, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.857265981941554, -15.240185171147306, 0.0, 1.0],
    [0.22396118414741767, -0.97459806484277733, 0.0, 0.0, 0.97459806484277733, 0.22396118414741767, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.190337416141036, -11.760772827859737, 0.0, 1.0],
    [-0.061198620710432292, -0.99812560773839509, 0.0, 0.0, 0.99812560773839509, -0.061198620710432292, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.8642818607834997, -7.9492499020526539, 0.0, 1.0],
    [0.98760422193868613, 0.15696464827750989, 0.0, 0.0, -0.15696464827750989, 0.98760422193868613, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 8.0291612159072709, -6.3706079345881568, 0.0, 1.0],
    [0.93335581146734348, 0.35895254449597791, 0.0, 0.0, -0.35895254449597791, 0.93335581146734348, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.2204586647898834, -7.3951471148296468, 0.0, 1.0],
    [0.86087847812397711, 0.50881061889758661, 0.0, 0.0, -0.5088106188975865, 0.86087847812397711, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.65016633374005028, -9.1217749341664245, 0.0, 1.0],
    [0.47292164230799327, 0.8811044888301901, 0.0, 0.0, -0.8811044888301901, 0.47292164230799327, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.8636444086904742, -11.626836241178456, 0.0, 1.0],
    [-0.98239288376983935, 0.1868267162864535, 0.0, 0.0, -0.1868267162864535, -0.98239288376983935, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.71710901432817498, -13.490168481128496, 0.0, 1.0],
    [-0.86061131719281625, 0.50926236923578572, 0.0, 0.0, -0.50926236923578572, -0.86061131719281625, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.868862205696499, -14.829958238083259, 0.0, 1.0],
    [-0.41805408856892584, 0.90842213702155283, 0.0, 0.0, -0.90842213702155283, -0.41805408856892579, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 5.338959425759839, -17.607144982444566, 0.0, 1.0],
    [-0.31016133713367589, 0.95068393535782969, 0.0, 0.0, -0.95068393535782969, -0.31016133713367589, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.7884925906260989, -21.30791732892034, 0.0, 1.0],
    [-0.14768809453690504, 0.98903398664154007, 0.0, 0.0, -0.98903398664154007, -0.14768809453690504, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.6995213565028182, -25.166056937370442, 0.0, 1.0],
    [0.34854628571705853, 0.93729156974382444, 0.0, 0.0, -0.93729156974382444, 0.34854628571705853, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.3169215132184808, -28.949256599483721, 0.0, 1.0],
    [0.88969251382861725, 0.45656021600366753, 0.0, 0.0, -0.45656021600366753, 0.88969251382861725, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.8902231120653763, -31.665634689434, 0.0, 1.0],
    [0.99100911138184555, 0.13379439882956487, 0.0, 0.0, -0.13379439882956487, 0.99100911138184555, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.1685783865197246, -32.830107862595057, 0.0, 1.0],
    [0.99987276795925129, -0.015951422930420848, 0.0, 0.0, 0.015951422930420848, 0.99987276795925129, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -2.7933610883889779, -33.064446731053899, 0.0, 1.0],
    [0.99416300533695512, -0.1078884554500309, 0.0, 0.0, 0.10788845545003091, 0.99416300533695512, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.7643726932568118, -32.817803200136105, 0.0, 1.0],
    [0.97436438549121951, -0.22497565265227731, 0.0, 0.0, 0.22497565265227731, 0.97436438549121951, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.683110516487169, -32.155294207037912, 0.0, 1.0],
    [0.88646675143451559, -0.46279228450908388, 0.0, 0.0, 0.46279228450908388, 0.88646675143451559, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -14.379568518103753, -30.789986553484916, 0.0, 1.0],
    [0.64769086307549628, -0.76190323919019964, 0.0, 0.0, 0.76190323919019975, 0.64769086307549639, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -17.416794617271826, -28.367260251472146, 0.0, 1.0],
    [0.025506992195940947, -0.99967464374621229, 0.0, 0.0, 0.99967464374621229, 0.025506992195940947, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.745116004700957, -24.94620733480933, 0.0, 1.0],
    [-0.86061171566353634, -0.5092616958525984, 0.0, 0.0, 0.5092616958525984, -0.86061171566353634, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -17.170834463595835, -22.069700600332947, 0.0, 1.0],
    [-0.94423803181675159, 0.32926363186788066, 0.0, 0.0, -0.32926363186788066, -0.94423803181675159, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -13.682233027412217, -21.759692067859387, 0.0, 1.0],
    [-0.86221889675213825, 0.50653585666122924, 0.0, 0.0, -0.50653585666122936, -0.86221889675213848, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.099194626836482, -23.419241983939898, 0.0, 1.0],
    [-0.91372031949860222, 0.4063436694909523, 0.0, 0.0, -0.40634366949095235, -0.91372031949860222, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.5687889490707789, -25.234476462637655, 0.0, 1.0],
    [-0.43521538085960909, -0.90032636985885595, 0.0, 0.0, 0.90032636985885595, -0.43521538085960909, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.0960430193443207, -24.675427620107655, 0.0, 1.0],
    [0.33269971098985573, -0.94303282143691392, 0.0, 0.0, 0.94303282143691392, 0.33269971098985579, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.0986107318708225, -21.432315682554449, 0.0, 1.0],
    [0.35574604475229177, -0.9345826617496712, 0.0, 0.0, 0.9345826617496712, 0.35574604475229177, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.4697757964890457, -17.69272709295133, 0.0, 1.0],
    [0.3230545111451168, -0.94638035843353685, 0.0, 0.0, 0.94638035843353685, 0.3230545111451168, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.8208993398974584, -13.948917911841438, 0.0, 1.0],
    [0.95862912733686412, -0.28465803382543464, 0.0, 0.0, 0.28465803382543464, 0.95862912733686412, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.3066310487520454, -11.519467937322959, 0.0, 1.0],
    [0.74006227428893689, -0.67253834847857275, 0.0, 0.0, 0.67253834847857275, 0.74006227428893689, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -12.616592077901648, -9.6392467360886691, 0.0, 1.0]];
const vertexPoints = [[1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -17.855819302512923, -7.2756222643618775, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -21.800717920841471, -7.3184153416516695, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -25.158759086765009, -6.2998867569875845, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -26.902139020357186, -3.0955263718625483, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -26.932404271044454, 0.80645720388391673, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -25.630409059027098, 4.4907232405682054, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -23.270170154466957, 7.6430796055820371, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -20.246303542142996, 10.200718510228677, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -16.831687267706698, 12.22725781695515, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -13.191485435792949, 13.831447273380519, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.4311037642894266, 15.140750110813578, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.6032500760814248, 16.241384065565072, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.7288260584444644, 17.165639498387947, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.1885295979791302, 17.877842527669323, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.1480670354773821, 18.239225770713468, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.109930316643489, 18.055075854832079, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 13.934719066147592, 17.085104624291443, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 15.932042887241014, 15.014666432676627, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.154022247506266, 13.160441346536562, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.249430557797453, 12.462970168002172, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.280723954471414, 12.12372398914659, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.3329457971877794, 11.640778917783354, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.5027432950868824, 10.63361529147061, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -5.1151027353247258, 8.9974308585093308, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.258905784625048, 6.6382006679539352, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -9.4995950436124978, 3.4077409963208263, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -7.65596292164029, 0.54883324136859479, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.0715466708686892, -1.0478574321104916, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.22302652872817871, -2.0638590364309608, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.6946806568773241, -2.4525139216063878, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.128746666094095, -1.1130909756849356, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.5273343861294624, 1.9330887716210967, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 11.648207992219795, 5.2886856881292985, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 14.367944087423126, 8.1392338965422546, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 17.802916189624085, 9.3904696467500202, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 20.884090195256672, 7.842895090655519, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 22.150628925280142, 4.3286820684065601, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.572663575585171, 0.48508721421755985, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 21.164548473335913, -3.3348845539222398, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 22.290504384916574, -7.0663146776309915, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 24.027272683204586, -10.649078376445045, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 24.926674150386621, -14.38328105170331, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 23.566311236595215, -17.68891905774294, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 20.228402110034189, -19.319835449082763, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 16.470611563893943, -18.802361861641419, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 13.182934266733691, -16.686098251750462, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 10.834822767163949, -13.583574614160575, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.986064075808514, -9.8413614583501499, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 9.0114738909464034, -7.0276847595542824, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.1009040650507096, -6.7570185790974309, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 2.3983828343636611, -8.184239463735695, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.97288484398699748, -10.248320526859636, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.6474284963320593, -12.536197379844689, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.1979443532831713, -13.998949123782701, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 4.2744178771261039, -15.978084338334421, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.1244047381297122, -19.432946614305106, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.3316864646807707, -23.219532654456817, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 7.7532846360695205, -27.119394222115524, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 6.3501414817615771, -30.495578668168033, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 3.0984112729666182, -32.414687655282648, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -0.80602028130058434, -33.024103142190306, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.7813995559867619, -32.98834825846378, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.7357468516052119, -32.548280113673478, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -12.580015865507063, -31.588647684744718, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -16.021957333628745, -29.72389628643181, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.40214730071429, -26.732003976291811, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -18.335011109739003, -23.272815343714939, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -15.534346703440661, -21.575045170054608, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -11.853785854764466, -22.482001897690566, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.3588037674243765, -24.387501326384804, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.9079550537358347, -25.321113421639843, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -3.6209630064972487, -23.344605161614137, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -4.7715517154284166, -19.558435079184562, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -6.1325129823741449, -15.81537878170567, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -8.007899576198346, -12.671502910262445, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -10.905756192062213, -10.498949432006782, 0.0, 1.0],
    [1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, -14.228697455514714, -8.5276564614676875, 0.0, 1.0]];
const layerCount = 10;

let vertexBooleans = [];
console.log(vertexBooleans);
initVertexBooleans();
console.log(vertexBooleans);

let camera, scene, renderer, stats;
let canvas;

var changingState = new function() {
    this.switchOn = true;
    this.switchOff = false;
    this.transparent = false;
    this.transparency = 1.;
    this.visualisation = false;
}

const onColor = new THREE.Color().setHex('0xcb2e0c');
const offColor = new THREE.Color().setHex('0x30a5c1');
const transparent = '0x1020ffff';
const brickColor = new THREE.Color().setHex('0x9B6C4B');

let mesh;
var theMesh;
var theVertexes = vertexMesh();
const amount = parseInt( window.location.search.substr( 1 ) ) || 25;
const count = Math.pow( amount, 3 );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2( 1, 1 );

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

const color = new THREE.Color();

function initVertexBooleans() {
    for (var j = 0; j < layerCount + 1; j ++) {
        var localLayer = [];
        for (var i = 0; i < vertexPoints.length; i++) {
            localLayer.push(false);
        }

        // console.log(firstLayer);

        vertexBooleans.push(localLayer);
    }
}

function visualization() {
    var geometry = new THREE.BoxGeometry( 5., 1., 1.);
    var localMaterial = new THREE.MeshPhongMaterial({
        color: brickColor,
        opacity: 1.,
        transparent: false,
    });

    var visMesh = new THREE.InstancedMesh( geometry, localMaterial, 1000);

    // creating the first layer

    var index = 0;

    for (var j = 0; j < layerCount; j ++) {
        var i = 0;
        // console.log(a_list);

        var add_matrix = new THREE.Matrix4().makeTranslation(0., 0., j * 1.);
        meshPlane.forEach((thisMatrix) => {

            if (i % 2 === j % 2) {
                if (vertexBooleans[j][(i - 1) % theVertexes.count] && vertexBooleans[j][i]) {
                    // console.log("added an instance of the mesh!");

                    var locMatrix = new THREE.Matrix4();

                    locMatrix.elements = Array.from(thisMatrix);
                    locMatrix.multiply(add_matrix);
                    visMesh.setMatrixAt(index, locMatrix);
                    // mesh.setColorAt(i, offColor);
                    vertexBooleans[j + 1][(i - 1) % theVertexes.count] = true;
                    vertexBooleans[j + 1][i] = true;
                    index++;
                } else {
                    vertexBooleans[j + 1][(i - 1) % theVertexes.count] = false;
                    vertexBooleans[j + 1][i] = false;
                }
            }

            i++;
        });

        console.log(vertexBooleans);
    }

    return visMesh;
}

function randomBricks() {
    for (var i = 0; i < theMesh.count; i++) {
        if (i % 2 === 0) {
            if (Math.random() < .9) {
                theMesh.setColorAt(i, onColor);
                theVertexes.setColorAt((i - 1) % theVertexes.count, onColor);
                theVertexes.setColorAt(i, onColor);
                vertexBooleans[0][(i - 1) % theVertexes.count] = true;
                vertexBooleans[0][i] = true;
                theMesh.instanceColor.needsUpdate = true;
                theVertexes.instanceColor.needsUpdate = true;
            }
        }
    }
}

function vertexMesh() {
    let i = 0;
    const matrix = new THREE.Matrix4();

    const geometry = new THREE.IcosahedronGeometry(.1, 3);
    const material = new THREE.MeshPhongMaterial({
        color: offColor,
        opacity: 5.,
        transparent: true,
    });

    theVertexes = new THREE.InstancedMesh( geometry, material, meshPlane.length );

    // console.log(matrix);

    // console.log(a_list);
    vertexPoints.forEach((thisMatrix) => {

        matrix.elements = thisMatrix;
        // if (i == 2) {
        //     console.log(thisMatrix);
        //     console.log(matrix);
        // }


        theVertexes.setMatrixAt(i, matrix);
        if (vertexBooleans[0][i]) {
            theVertexes.setColorAt(i, onColor);
        } else {
            theVertexes.setColorAt(i, offColor);
        }

        i++;
    })
    return theVertexes;
}

init();
animate();
initUi();

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

    var ifReset = { reset:function(){
        addNewMesh(brickFromMatrix(mesh, 2.));
    }};

    var ifRandom = { randomize:function(){
        randomBricks();
    }};

    gui.add(ifReset, 'reset');
    gui.add(ifRandom, 'randomize');

    gui.add(changingState, 'visualisation').onChange( function () {
        changingState.switchOff=false;
        changingState.switchOn=false;
        gui.__controllers[1].updateDisplay();
        gui.__controllers[2].updateDisplay();

        if (changingState.visualisation) {
            initVis(visualization());
        } else {
            addNewMesh(brickFromMatrix(mesh, 1.));
        }
    });

    return gui;
}

const spacing = 1.;

// birck from matrix
function brickFromMatrix(mesh, scale) {
    let i = 0;
    const matrix = new THREE.Matrix4();

    const geometry = new THREE.BoxGeometry(.9, .9, .9 * scale);
    const material = new THREE.MeshPhongMaterial({
        color,
        opacity: 1.,
        transparent: false,
    });

    mesh = new THREE.InstancedMesh( geometry, material, meshPlane.length );

    console.log(matrix);

    // console.log(a_list);
    meshPlane.forEach((thisMatrix) => {

        if (i % 2 === 0) {

            matrix.elements = thisMatrix;
            if (i == 2) {
                console.log(thisMatrix);
                console.log(matrix);
            }


            mesh.setMatrixAt(i, matrix);
            if ((vertexBooleans[0][(i - 1) % theVertexes.count] && vertexBooleans[0][i])) {
                mesh.setColorAt(i, onColor);
            } else {
                mesh.setColorAt(i, offColor);
            }

        }

        i++;
    });

    // console.log(i);
    theMesh = mesh;
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

    mesh = brickFromMatrix(mesh, 1.);

    scene.add( mesh );
    scene.add(vertexMesh());

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

    animate();
}

function addNewMesh(mesh) {
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if(scene.children[i].type === "Mesh")
            scene.remove(scene.children[i]);
            console.log("removed a mesh");
    };

    console.log(mesh);
    scene.add( mesh );
    scene.add(vertexMesh());
    animate();
}

function initVis(visMesh) {
    for (let i = scene.children.length - 1; i >= 0; i--) {
        if(scene.children[i].type === "Mesh")
            scene.remove(scene.children[i]);
        console.log("removed a mesh");
    };

    scene.add(visMesh);
    console.log(scene.children);
    animate();
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

function intersection(mesh) {
    return raycaster.intersectObject( mesh );
}

function render() {
    raycaster.setFromCamera( mouse, camera );
    const xs = intersection(theMesh);

    if ( xs.length > 0) {
        const instanceId = xs[ 0 ].instanceId;

        if (changingState.switchOn) {
            theMesh.setColorAt( instanceId, onColor );
            theVertexes.setColorAt((instanceId - 1) % theVertexes.count, onColor);
            theVertexes.setColorAt(instanceId, onColor);
            vertexBooleans[0][(instanceId - 1) % theVertexes.count] = true;
            vertexBooleans[0][instanceId] = true;
            theMesh.instanceColor.needsUpdate = true;
            theVertexes.instanceColor.needsUpdate = true;
            // console.log(theMesh);
            // console.log("coloring on index "+instanceId);
            // console.log(scene.children);
        } else if (changingState.switchOff){
            theMesh.setColorAt( instanceId, offColor );
            theMesh.instanceColor.needsUpdate = true;
            vertexBooleans[0][(instanceId - 1) % theVertexes.count] = false;
            vertexBooleans[0][instanceId] = false;
            theVertexes.setColorAt((instanceId - 1) % theVertexes.count, offColor);
            theVertexes.instanceColor.needsUpdate = true;
            theVertexes.setColorAt(instanceId, offColor);
            // console.log(theMesh);
            // console.log("coloring off index "+instanceId);
            // console.log(scene.children);
        }

    }

    renderer.render( scene, camera );
}

