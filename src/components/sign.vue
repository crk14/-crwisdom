<template>
  <div class="sign">
    <div class="tophader"  style="margin-top: .3rem;">
		<div onclick="window.history.go(-1)" style="color: #666666;position: absolute;top: 50%;margin-top: -0.3rem;left: 0.28rem;background: rgb(78,108,247);width: .6rem;height: .6rem;border-radius: 50%;">
			<img src="../assets/zuo.png" style="width: .4rem;height: .4rem;position: absolute;top: 50%;margin-top: -0.2rem;left: 0.1rem;"/>
		</div>
			<!-- <van-icon name="arrow-left" /> -->
		<div style="margin-left: 1.16rem;font-size: .4rem;font-weight: 550;">注册CR Wisdom</div>
      <!-- <p>找回密码</p> -->
    </div>
   <!-- <div class="headtop">
      <p class="headtext">你好，</p>
      <p class="headtext">欢迎注册CR Wisdom</p>
    </div> -->
    <div class="togleulbox">
      <div class="loginul">
        <div >
          <!-- <p>昵称</p> -->
          <input type="text" v-model="nick_name" placeholder="请输入您的用户名" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>手机号</p> -->
          <input type="text" v-model="mobile" placeholder="请输入您的手机号或邮箱" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>登录密码</p> -->
          <input type="password" v-model="password" placeholder="请输入您的登录密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>重复密码</p> -->
          <input type="password" v-model="passwordc" placeholder="请再次输入您的登录密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_password" placeholder="请输入您的交易密码" />
          <p class="hr"></p>
        </div>
        <div>
          <!-- <p>交易密码</p> -->
          <input type="password" v-model="trad_passwordc" placeholder="请再次输入您的交易密码" />
          <p class="hr"></p>
        </div>
       <div>
          <input type="text" v-model="invite_code" placeholder="请输入您的邀请码" />
          <p class="hr"></p>
        </div>
       <!-- <div>
          <input type="text" v-model="code" placeholder="请输入验证码" />
          <button class="sendcode" @click="setcode" style="background: #FFFFFF">获取验证码</button>
          <p class="hr"></p>
        </div> -->
		<div class="pass" style="position: absolute;">
			<label style="width: 0px;">
			  <input type="checkbox" v-model="ispass" style="margin: 0;width: 20px;height: 20px;">
			</label>
			<span class="box"><van-icon :style="{opacity:ispass?1:0}" name="success" color="#306ce8"/></span> <span style="font-size: 12px;color: #000000;margin-top: -3px;margin-left: 3px;">我已阅读并完全同意接受<span @click="bool = true" style="color:rgb(64,115,231)">《用户协议》</span><span @click="bool2=true" style="color:rgb(64,115,231)">《风险提示书》</span></span>
		</div>
        <button type="button" class="changebton" @click="send" style="background:rgb(48,108,232);border-radius: 25px;">注册</button>
        <!-- <p class="nobank" @click="$router.push('login')">已有账号</p> -->
      </div>
    </div>
	<van-popup v-model="bool" position="right" class="poup" :style="{ height: '100%' ,width:'100%'}">
		<h2> CR Wisdom量化平台用户协议</h2>
		<span @click="bool = false" style="position: absolute;right: 5px;top: 10px;">
			<van-icon name="cross" color="#8a9097" size="26px" /></span>
		<h4>【最新修订】： 2020年3月21日</h4>
		<div class="p">
			1.用户点击CR Wisdom注册页面的同意按钮，视为用户自愿无条件与CR Wisdom已达成《CR Wisdom用户协议》（下称"本协议"），就用户进入使用CR Wisdom智能平台相应的交易服务达成本协议的全部约定
		</div>
		<div class="p">
			2.CR Wisdom及用户均已认真阅读本《CR Wisdom用户协议》中全部条款及CR Wisdom已发布的法律声明和操作规则的全部内容，对上述文件均已知晓、理解并接受，同意将其作为确定双方权利义务的依据。CR
			Wisdom《法律声明》为本协议的必要组成部分，用户接受本协议的同时即视为接受CR Wisdom《法律声明》的全部内容。本协议内容包括本协议正文以及CR
			Wisdom已经发布的或将来可能发布的各类规则、声明、说明。所有规则、声明、说明为协议不可分割的一部分，与协议正文具有同等法律效力。。
		</div>
		<div class="p">
			3.本协议不涉及CR Wisdom用户与其他用户之间因数字货币交易或市场推广而产生的任何法律关系及法律纠纷。
		</div>
		<div class="p">
			4. CR Wisdom平台保留随时自行决定、修改或变更本使用条款的权利。CR
			Wisdom平台将通过更新APP上修订条款和修改本页显示的[最新修订日期]通知变更内容。对本使用条款的任何及所有修改或变更将在网站上公布或发送给用户后立即生效。因此，您继续使用CR
			Wisdom平台的服务，即表示接受修改后的协议和规则。如果您不同意对本使用条款进行的任何修改，请立即停止使用本服务。CR Wisdom平台希望您经常查看本使用条款，以确保您理解适用于您访问和使用本服务的条款和条件。
		</div>
		<h3>一、定义条款</h3>
		<div class="p p1">
			1.1."数字货币"： 指互联网中代替实体货币流通的信息流或数据流。
		</div>
		<div class="p p1">
			1.2."CR Wisdom"：指CR Wisdom量化技术服务平台，运营和管理的交易平台，域名为：www.antsai.org。CR Wisdom量化技术服务平台通过该网络交易平台为用户提供数字货币即时兑换交易服务。
		</div>
		<div class="p p1">
			1.3."CR Wisdom"：CR Wisdom平台旗下区块链应用场景服务，CR Wisdom服务指为特定会员提供的数字货币相关服务。
		</div>
		<div class="p p1">
			1.4."用户"：指用户自愿无条件接受并完全同意本协议全部内容，以及CR Wisdom所发布和更新的法律条款和操作规则、通过CR Wisdom平台进行数字货币交易的注册会员。
		</div>
		<div class="p p1">
			1.5."用户注册"：用户注册是指用户登录CR Wisdom平台，并按要求填写相关信息并确认完全同意履行相关用户协议的过程。
		</div>
		<div class="p p1">
			1.6."数字货币交易"：用户通过CR Wisdom平台进行的数字货币数字交易活动。
		</div>
		<div class="p p1">
			1.7."购买点卡费"：用户为了享受CR Wisdom平台下用户技术服务而支付的费用。
		</div>
		<div class="p p1">
			1.8."代理费"：用户为了享受CR Wisdom平台更优惠折扣而同意支付代理的费用。
		</div>
		<h3>二、用户注册</h3>
		<h5>2.1.注册资格 </h5>
		<div class="p">
			您声明并保证承诺：您已经年满18周岁或达到根据适用法律订立具有约束力合约的法定年龄；（b）是具有订立本使用条款的完全法律行为能力和授权的个人、法人或其他组织；（c）以前未被中止或取消使用服务的资格；（d）您目前没有CR
			Wisdom平台账户。如果您担任法律实体的雇员或代理人，并以此身份代表其签订本使用条款，您声明并保证您拥有约束该法律实体的所有必要权利和授权。(e)用户具有完全民事权利能力和行为能力，或虽不具有完全民事权利能力和行为能力，但点击同意注册按钮，本平台即视为经其法定代理人同意并由其法定代理人代理注册及应用CR
			Wisdom服务。
		</div>
		<h5>2.2.注册目的 </h5>
		<div class="p">
			您声明并保证承诺：用户进行用户注册并非出于违反法律法规或破坏CR Wisdom平台服务秩序的目的，并且用户无条件同意一旦违反这一承诺，承担所有一切法律责任。
		</div>
		<h3>三、用户服务</h3>
		<div class="p">
			CR Wisdom平台为用户通过CR Wisdom应用功能交易提供的网络平台服务。CR Wisdom平台不作为买家或是卖家参与买卖数字货币行为本身，不承担交易所市场行情波动而导致用户账户资产损失的所有法律责任。
		</div>
		<h5>3.1.服务内容 </h5>
		<div class="p p1">
			3.1.1.用户有权在CR Wisdom量化服务平台查看其会员账号下的信息。
		</div>
		<div class="p p1">
			3.1.2.用户有权按照CR Wisdom发布的平台规则参与相关合法活动。
		</div>
		<h5>3.2.服务规则 </h5>
		<div class="p">
			用户承诺遵守下列CR Wisdom服务规则：
		</div>
		<div class="p p1">
			3.2.1.用户应当遵守法律法规、规章、规范性文件及政策要求的规定，保证充值激活或购买点卡的账户资金和数字货币来源的合法性，不得在CR Wisdom平台或利用CR Wisdom服务从事非法或其他任何形式损害CR
			Wisdom或第三方权益以及公共利益的活动，如发送或接收任何违法、违规、违反公序良俗、侵犯他人权益的信息，发送或接收传销材料或存在其他危害的信息或言论，未经CR Wisdom授权使用或伪造CR Wisdom电子邮件题头信息等。
		</div>
		<div class="p p1">
			3.2.2.用户应当遵守法律法规应当妥善使用和保管其CR Wisdom账号及密码、邮箱账户、及交易所的API密钥安全。用户对使用其CR Wisdom账号和密码、邮箱验证码、API密钥进行的任何操作和后果承担全部责任。当用户发现CR
			Wisdom账号、密码、API、邮箱验证码被未经其授权的第三方使用，或存在其他账号安全问题时，应立即有效通知CR Wisdom平台，要求CR Wisdom暂停该CR Wisdom账号的服务。CR
			Wisdom有权在合理时间内对用户的该等请求采取行动，但对CR Wisdom采取行动前用户已经遭受的损失不承担任何法律责任。
		</div>
		<div class="p p1">
			3.2.3 用户在未经CR Wisdom书面同意的情况下，不得将CR Wisdom账号通过任何形式以借用、租用、转让、出售、抵押等其他方式给与他人，否则用户承担所有责任，CR Wisdom平台有权在不通知用户的情况下冻结用户账户。
		</div>
		<div class="p p1">
			3.2.3.用户应当遵守CR Wisdom平台以及国家法律法规，如平台监测发现用户账户出现异常，平台可以不通知用户情况下，暂时冻结账户一切资产及行为。
		</div>
		<div class="p p1">
			3.2.4.用户应当遵守CR Wisdom不时发布和更新的用户协议以及其他服务条款和操作规则。
		</div>
		<div class="p p1">
			3.2.5.用户应当自觉维护CR Wisdom平台品牌及商誉等行为，若平台发现该用户出现损害平台形象及商誉行为，会员违反服务规则协议，影响平台其他成员正常使用CR Wisdom平台服务，CR
			Wisdom平台有权在不通知该会员的情况下，冻结其账户使用并制止其进一步伤害并保留一切法律追究权利。
		</div>
		<div class="p p1">
			3.2.6 用户应该详尽了解CR Wisdom平台的相关服务内容，CR Wisdom量化系统点卡及生态产品全部不支持试用，退换等服务内容。
		</div>
		<h3>四、数字货币交易规则</h3>
		<div class="p">
			用户承诺在其进入CR Wisdom平台，通过使用CR Wisdom应用服务过程中，应当遵守以下CR Wisdom数字货币交易规则。
		</div>
		<h5>4.1.充值提币 </h5>
		<div class="p">
			用户在使用CR Wisdom应用服务时，应尽量避免CR Wisdom账户经常性充值或提币行为，避免影响CR Wisdom的正常工作。
		</div>
		<h5>4.2.私自挂单</h5>
		<div class="p">
			用户在使用CR Wisdom量化应用服务时，应尽量避免人工操作参与市场买卖服务交易行为，避免影响CR Wisdom量化的正常工作。
		</div>
		<h5>4.4 撤销/修改委托</h5>
		<div class="p">
			在委托未完成交易时，应尽量避免人工操作去进行撤销/修改委托订单，避免影响CR Wisdom的正常工作。
		</div>
		<h5>4.3 交易委托</h5>
		<div class="p">
			CR Wisdom量化平台在有满足用户委托价格的交易时将会自动完成撮合交易而无需提前通知用户。
		</div>
		<h3>五、用户的权利和义务</h3>
		<div class="p p1">
			5.1 用户有权按照本协议约定接受CR Wisdom提供的数字货币交易平台服务。
		</div>
		<div class="p p1">
			5.2 用户有权随时终止使用CR Wisdom平台服务。
		</div>
		<div class="p p1">
			5.3 用户有权随时提取在CR Wisdom平台资产余额，但需向CR Wisdom平台支付相应提币手续费。
		</div>
		<div class="p p1">
			5.4 用户对注册时提供的个人资料的真实性、有效性及安全性负责并承担责任。
		</div>
		<div class="p p1">
			5.5 用户在使用CR Wisdom应用时不得恶意干扰数字货币交易的正常进行、破坏交易秩序。
		</div>
		<div class="p p1">
			5.6 用户不得以任何技术手段或其他方式干扰CR Wisdom平台正常运行或干扰其他用户对CR Wisdom服务的使用。
		</div>
		<div class="p p1">
			5.7 如用户因网上交易与或者市场推广与第三方产生诉讼的，不得通过司法或行政以外的途径要求CR Wisdom平台提供相关资料。
		</div>
		<div class="p p1">
			5.8 用户不得以夸大事实，虚构事实等方式恶意宣传、诋毁CR Wisdom平台的品牌及商誉。
		</div>
		<div class="p p1">
			5.9 用户有义务和责任妥善保管自身账户、密码、API密钥，因用户原因导致帐号密码和API密钥等信息泄漏引起的损失需自行承担。
		</div>
		<div class="p p1">
			5.10 用户不得通过任何形式以以借用、试用、租用、转让、出售、抵押等其他方式给与他人，否则用户承担所有责任，CR Wisdom平台有权在不通知用户的情况下冻结用户账户。
		</div>
		<h3>六、城市合伙人</h3>
	
		<div class="p p1">
			6.1 城市合伙人应该共同维护市场销售价格统一，对于恶意扰乱市场价格行为，平台警告无效有权暂停或取消其城市合伙人资格。
		</div>
		<div class="p p1">
			6.2 城市合伙人应该共同维护CR Wisdom平台，不得以任何形式来损害平台及其商誉，平台警告无效有权暂停或取消其城市合伙人资格。
		</div>
		<h3>七、CR Wisdom的权利和义务</h3>
		<div class="p p1">
			7.1 如用户不具备本协议约定的注册资格，则CR Wisdom平台有权拒绝用户进行注册，对已注册的用户有权无需通知用户许可情况下，注销或冻结其用户账户，CR
			Wisdom平台因此而遭受损失的经济损失有权向前述用户或其法定代理人主张赔偿。同时，CR Wisdom保留其他任何情况下决定是否接受用户注册的权利。
		</div>
		<div class="p p1">
			7.2 CR Wisdom平台发现账户使用者并非账户初始注册人时，有权中止或终止该帐户的使用；
		</div>
		<div class="p p1">
			7.3 CR Wisdom平台通过技术检测、人工抽检等检测方式合理怀疑用户提供的信息错误、不实、失效或不完整时，有权通知用户更正、更新信息或要求其提供证明材料，或中止、终止为其提供CR Wisdom服务。
		</div>
		<div class="p p1">
			7.4 CR Wisdom平台有权在发现CR Wisdom平台上显示的任何信息存在错误时，对信息予以更正和解释权的权利。
		</div>
		<div class="p p1">
			7.5 CR Wisdom平台保留随时修改、中止或终止CR Wisdom服务的权利，CR Wisdom行使修改或中止服务的权利不需事先告知用户，CR Wisdom平台终止平台一项或多项服务的，终止自CR
			Wisdom平台在网站上发布终止公告之日生效。
		</div>
		<div class="p p1">
			7.6 CR Wisdom平台应当采取必要的技术手段和管理措施保障CR Wisdom的正常运行，并提供必要、可靠的交易环境和交易服务，维护数字货币交易秩序。用户同意CR
			Wisdom、第三方平台、关联银行等机构即时采取一切有效措施纠正交易错误，包括对用户资金账户的交易记录等信息的查询，以及对账户资金的划转，而无需用户另行给予授权。
		</div>
		<div class="p p1">
			7.7 如用户连续半年未登录使用CR Wisdom，则CR Wisdom有权注销用户的CR Wisdom账号。账号注销后，CR Wisdom有权将相应的会员ID开放给其他用户注册使用。
		</div>
		<div class="p p1">
			7.8 CR Wisdom平台有权在本协议履行期间及本协议终止后保留用户的注册信息及用户应用CR Wisdom服务期间的全部信息。
		</div>
		<div class="p p1">
			7.9. CR Wisdom有权随时删除CR Wisdom网站内各类不符合国家法律法规、规范性文件等内容信息，CR Wisdom平台行使该等权利无需提前通知用户或征得用户的同意。
		</div>
		<div class="p p1">
			7.10 CR Wisdom平台为用户提供的会员服务，包含但不仅限于量化系统和生态产品，不提供任何形式的试用、退换、退款服务，同时用户承诺不得出借或转让账户，否则一切责任由用户自行承担。
		</div>
		<h3>八、免责声明</h3>
		<div class="p p1">
			8.1 在法律允许的范围内，不论在何种情况下，CR
			Wisdom对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障等原因，或罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力第三方的原因或CR
			Wisdom当前技术无法防止而造成的不能服务或延迟服务，以及用户因此而遭受的损失不承担任何法律责任。
		</div>
		<div class="p p1">
			8.2 在适用法律允许的最大范围内，本服务、CR Wisdom平台的材料以及由CR Wisdom平台或代表CR Wisdom平台提供的任何产品、服务或其他项目均是在"现状"和"可用"的基础上提供的，同时CR
			Wisdom平台明确放弃，您亦放弃，任何种类的所有其他保证，无论是明示的还是默示的，包括但不限于适销性、特定用途适合性、所有权或不侵权或者因履行过程、交易过程或交易使用而产生的保证。在不限制上述规定的情况下，CR
			Wisdom平台对网站、服务或CR Wisdom平台材料的准确性、完整性、可靠性、有效性、无错误或无病毒或其他有害成分不做任何声明或保证。CR
			Wisdom平台不保证任何订单会被执行、接受、记录或保持未完成状态。除本协议规定的明确声明外，您在此确认并同意，您在使用和获取本服务方面没有依赖任何其他书面或口头声明或协议。在不限制上述规定的情况下，您特此理解并同意CR
			Wisdom平台对以下原因引起的或与之相关的任何损失或损害概不负责：（A）数字货币价格数据的不准确性、缺陷或遗漏；（B）此类数据传输中的任何错误或延迟；（C）此等数据的中断，以及（D）其他用户的行为、不作为或违反本协议的行为造成的任何损害。如果被您居住的司法管辖区的适用法律所禁止，则本协议所载默示保证免责声明可能不适用。
		</div>
		<div class="p p1">
			8.3 在适用法律允许的最大范围内，CR Wisdom平台、其隶属机构以及各自的股东、成员、董事、高级职员、雇员、律师、代理人、代表、供应商或承包商在任何情况下均对因本服务、本服务的任何履行或不履行或由CR
			Wisdom平台及其隶属机构提供或代表CR
			Wisdom平台提供的其他产品、服务或其他项目引起的任何附带、间接、特殊、惩罚性、后果性或类似的损害或责任（包括但不限于数据、信息、收入、利润或其他业务或财务利益的损失）概不负责，无论是根据合同、法规、严格责任还是其他理论，即使CR
			Wisdom平台已经被告知存在损害的可能性，除非最终司法裁定此等损害是因CR
			Wisdom平台的重大过失、欺诈、故意不当行为或故意违法行为造成的。一些司法管辖区不允许排除或限制附带或后果性损害，因此上述限制可能不适用于您。尽管有上述规定，在任何情况下，CR
			Wisdom平台、其隶属机构及其各自的股东、成员、董事、高级职员、雇员、律师、代理人、代表、供应商或承包商因CR Wisdom平台或其关联方提供或代表CR
			Wisdom平台或起关联方提供的服务、服务的任何履行或不履行、或任何其他产品、服务或其他项目而产生的责任，无论是根据合同、法规、严格责任还是其他理论，均不会超过在引起责任索赔的事件发生之前的十二个月内您根据本协议支付给CR
			Wisdom平台的费用金额。
		</div>
		<div class="p p1">
			8.4 您同意赔偿CR
			Wisdom平台、其隶属机构、承包商、许可方及其各自的董事、高级职员、雇员和代理人，并使它们免受因以下原因引致或与以下原因相关的任何索赔、诉讼、程序、调查、要求、诉讼、成本、费用和损害（包括律师费、罚金或任何监管机关收取的罚款）：（i）您使用本服务或与本服务相关的行为；（ii）您违反本服务条款或我们执行本服务条款；或（iii）您在使用本服务期间违反任何适用法律、法规或任何第三方的权利。如果根据本服务条款，您有义务赔偿CR
			Wisdom平台、其隶属机构、承包商、许可人及其各自的董事、高级职员、雇员或代理人，CR Wisdom平台将有权自行控制任何诉讼或程序，并确定CR Wisdom平台是否希望和解，如果愿意，基于什么条款和解。
		</div>
		<div class="p p1">
			8.5 交易或持有数字资产的损失风险可能很大。因此, 您应该根据您的财务状况仔细考量。CR Wisdom平台不允许也不提供法定货币的结算或提款服务。 虽然还有第三方交易平台可以将数字资产转换或清算为钱或法定货币，
			但我们不提供此类服务。CR Wisdom平台不会将数字资产视为钱或法定货币，因为数字资产不以任何政府或中央银行为后盾支持。
		</div>
		<div class="p p1">
			8.6 CR Wisdom平台提供API密钥接入服务的任何第三方交易所平台，如提供任何第三方交易所平台，由于其自身经营或者国家政策出现任何问题，导致交易所平台关闭或者暂停资产提现业务，CR
			Wisdom平台用户存放在该交易所的资金安全，CR Wisdom平台不承担任何法律责任，这重要条款作为用户正式注册CR Wisdom平台智能服务所必须须知并且无条件同意条款。
		</div>
		<div class="p p1">
			8.8 用户有责任承担保管好自身平台的账户、密码、API密钥的义务，平台不会由于用户的疏忽或者丢失API导致的损失承担全部责任。
		</div>
		<h3>九、知识产权</h3>
		<div class="p p1">
			9.1 CR Wisdom平台所包含的全部智力成果包括但不限于网站标志、数据库、网站设计、文字和图表、软件、照片、录像、音乐、声音及其前述组合，软件编译、相关源代码和软件 (包括小应用程序和脚本) 的知识产权权利均归CR
			Wisdom平台所有。用户不得为商业目的复制、更改、拷贝、发送或使用前述任何材料或内容。
		</div>
		<div class="p p1">
			9.2 CR Wisdom平台名称中包含的所有权利 (包括但不限于商誉和商标、标志) 均归CR Wisdom平台所有。
		</div>
		<div class="p p1">
			9.3 用户接受本协议即视为用户主动将其在CR
			Wisdom平台发表的任何形式的信息的著作权，包括但不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利无偿独家转让给CR
			Wisdom所有，CR Wisdom平台有权利就任何主体侵权单独提起诉讼并获得全部赔偿。本协议属于《中华人民共和国著作权法》第二十五条规定的书面协议，其效力及于用户在CR
			Wisdom平台发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。
		</div>
		<div class="p p1">
			9.4 用户在使用CR Wisdom平台服务过程中不得非法使用或处分CR Wisdom平台或他人的知识产权权利。用户不得将已发表于CR Wisdom平台的信息以任何形式发布或授权其它网站（及媒体）使用。
		</div>
		<h3>十、私隐政策及声明</h3>
		<div class="p">
			CR Wisdom平台建立专业的客服团队，并建立完善的客户服务制度，从技术、人员和制度上保障用户提问及投诉渠道的畅通，为用户提供及时的疑难解答与投诉反馈。
		</div>
		<div class="p">
			CR Wisdom平台使用您的信息数据， 因为我们通过我们的数字资产（不涉及法定货币）交易平台为您提供访问和实用程序服务。在提供服务的过程中， 我们收集和维护个人信息。通常，
			我们绝对不会向任何非附属第三方披露任何有关客户的个人信息， 除非下文所述的情况下。
		</div>
		<h3>【数据收集目的和使用】 </h3>
		<div class="p">
			CR Wisdom平台收集， 处理和存储的个人数据， 是通过您使用我们的服务所取得的，或者已经获得了您的同意。这些个人数据可能包括联系方式或与您的设备或互联网服务相关的任何信息（如IP地址和MAC号码）。 CR
			Wisdom平台使用个人数据与您沟通， 并管理、履行、改进以及为您制定个性化服务。CR Wisdom平台还可以从我们收集的任何个人数据中生成通用数据，并将其用于我们自己的目的。我们还可以使用这些数据与您就CR
			Wisdom平台或其合作伙伴提供的其他产品或服务进行沟通。除非您同意并在下面列出的详细情况下， 否则我们不会与第三方（与CR Wisdom平台的服务相关的合作伙伴除外）分享您的个人数据。
			我们可能会与第三方分享您的个人资料信息：
		</div>
		<div class="p">
			（1）如果我们认为分享对于执行条款是有必要的；
		</div>
		<div class="p">
			（2）使我们能够遵守政府机构， 包括监管机构；
		</div>
		<button class="changebton" @click="bool=false" style="background: #2167ff;">我已阅读并了解</button>
	</van-popup>
	<van-popup v-model="bool2" position="right" class="poup" :style="{ height: '100%' ,width:'100%'}">
		<h2> 风险披露声明</h2>
			<span @click="bool2 = false" style="position: absolute;right: 5px;top: 10px;">
				<van-icon name="cross" color="#8a9097" size="26px" /></span>
			<div class="p">
				本交易风险披露和免责声明应与CR Wisdom平台
				<span @click="bool = true" style="color:#306ce8;">
					<<用户使用协议>>
				</span>
				的服务条款一起阅读。简单来讲，我们希望当您在我们的平台上使用服务时能够理解相关重要的风险和合规事宜。
			</div>
			<h3>第一条：目的</h3>
			<div class="p">
				为了维护CR
				Wisdom平台合法合规可持续发展，我们建立并实施了一系列的反洗钱、反恐怖融资和贸易与经济制裁计划（"反洗钱/反恐融资/制裁计划"或"计划"）。我们致力于推进合法、透明的商业活动，并在用户、监管机构和数字资产行业中保持一个良好的商业声誉。
			</div>
			<div class="p">
				本风险提示书旨在向会员投资者揭示数字资产衍生品交易的投资风险，并且帮助投资者评估和确定自身的能力。
			</div>
			<div class="p">
				鉴于投资风险的存在，在确认本协议及进行现货交易或者合约交易前，投资者应该仔细阅读本风险提示书，必须确保自己理解有关现货或者合约交易的性质、规则，并依据自身的投资经验、目标、财务状况、承担风险的能力等自行决定是否参与现货或者合约交易。
			</div>
			<h3>第二条：业务模式</h3>
			<div class="p">
				CR Wisdom是一家全球性的数字资产量化交易技术服务平台，交易者使用CR Wisdom平台技术在数字交易市场进行量化交易。为清楚起见，买方和卖方彼此之间进行交易，而CR
				Wisdom平台不参与到实际交易中，不触碰交易者任何资金。
			</div>
			<div class="p">
				用户可以下载注册登陆CR Wisdom生态APP平台，以获得相关技术服务。 交易风险披露：数字资产交易有巨大风险。交易或持有数字资产的损失风险可能巨大。因此，您应根据您的财务状况仔细考虑您是否适合进行交易。
			</div>
			<div class="p">
				适合的投资者，使用CR
				Wisdom量化系统交易，数字资产衍生品交易具有高杠杆性和高风险性，仅适合专业投资机构或投资经验丰富的人士，或者能够充分理解有关于数字资产衍生品交易的一切风险，能承受因投资失误而造成账户资金部分或者全部损失的人士。
			</div>
		
			<h3>第三条：价格波动的风险</h3>
			<div class="p">
				数字货币衍生品作为一种特殊的具有投资价值的产品，其价格受多种因素的影响，价格波动大，会员投资者在实际操作中难以全面把握，因而存在出现投资失误的可能性，如果不能有效控制风险，则可能遭受较大的损失，投资者必须独自承担由此导致的一切损失。
			</div>
			<h3>第四条：交易风险</h3>
			<div class="p">
				数字货币量化交易有极高的风险。
			</div>
			<div class="p">
				CR Wisdom量化平台为用户提供API密钥接入数字货币交易服务，由于数字货币交易市场风险无法预测行情变化，因此用户注册CR Wisdom平台用户必须清晰认知自身经济能力与抗风险能力，并承诺自愿承担因此发生的一切后果。
			</div>
			<div class="p">
				CR Wisdom平台官方不会在任何场合对正式用户作出交易收益承诺和资金保本承诺和义务。CR Wisdom平台以其团队技术能力尽力为平台用户赚取正向收益，如出现行情波动变化和不可抗力因素变化，用户应理性自行承担投资风险。
			</div>
			<div class="p">
				数字货币市场是全新的、未经确认的，而且可能不会增长或贬损。目前，数字货币主要由投机者大量使用，零售和商业市场使用相对较少，因此数字货币价格易产生波动，并进而对数字货币投资产生不利影响。
			</div>
			<div class="p">
				数字货币市场没有像中国股市那样的涨跌停限制，同时交易是7X24小时开放的。数字货币由于筹码较少，价格易受到庄家控制，有可能出现一天价格涨几倍的情况，同时也可能出现一天内价格跌去一半的情况。
			</div>
			<div class="p">
				参与数字货币交易，用户应当自行控制风险，评估数字货币投资价值和投资风险，承担损失全部投资交易的经济风险。
			</div>
			<div class="p">
				因国家法律、法规和规范性文件的制定或者修改，导致数字货币的交易被暂停、或者禁止的，因此造成的经济损失全部由用户自行承担。
			</div>
			<h3>第五条：其他风险</h3>
			<div class="p p1">
				（1）当用户参与交易所合约交易使用高倍杠杆时，将会对用户自身和市场带来较大的风险，因此交易所为了维护市场稳定，对于使用高倍杠杆的用户持仓会进行监控，当交易所判断用户持仓有可能会对市场稳定造成较大影响时，将会采取相应的处理措施，包括但不限于沟通、揭示风险、强制减仓、强制平仓、撤单、提前交割结算等，并将给予用户书面解释。
			</div>
			<div class="p p1">
				（2）数字资产衍生品市场的衍生品交易规则，包括但不限于调整系数、到期日、产品规则等可根据交易所实际运营情况进行修改，交易所如因特殊情况需要对产品进行提前或延后交割，在官网公布或短信通知等方式履行告知义务后，用户需及时处理自身仓位，如因此造成的可能损失或者收益，皆由用户自身承担。
			</div>
			<div class="p p1">
				（3）重要提示
			</div>
			<div class="p">
				1、投资者在参与之前务必详尽地了解数字货币交易的基本知识和相关风险以及参与衍生品交易所有关的业务规则等。
			</div>
			<div class="p">
				2、本风险提示书上述风险事项仅为列举性质，未能详尽的列明有关数字资产衍生品交易的所有风险因素，投资者参与数字资产衍生品交易投资前，还应该认真对其它可能存在风险因素有所了解和掌握。
			</div>
			<div class="p">
				3、我们诚挚的希望和建议投资者，从风险承受能力等自身实际情况出发，慎重的决定是否参与此量化交易，合理地配置自己的数字资产。
			</div>
			<h3>第六条：监管环境</h3>
			<div class="p">
				我们了解到监管机构对数字资产的监管与规范采取了多种方式，包括将数字资产定义或归类为虚拟金融资产（马耳他）、可兑换虚拟货币（美国 FinCEN）或者虚拟商品（香港）。
			</div>
			<div class="p">
				我们认为数字资产交易所平台上提供的所有数字资产属于创新的另类资产类别，因此，数字资产不应该被称为钱或货币。
			</div>
			<div class="p">
				重要信息披露：数字资产不是钱或法定货币。在不同时期我们可能会对各政府机构所采取的监管方式有些见解; 但是，我们会一直全面遵守我们经营所在国家的规章制度。
			</div>
			<div class="p">
				同时，我们定期与监管机构和同行探讨监管数字资产业务的最佳方法。此外，CR Wisdom平台不接受某些客户，这是为了保持在市场上的良好声誉并确保一个强大的合规市场 。
			</div>
			<div class="p">
				我们遵守适用法规。作为良好的企业公民，执法部门可能会要求我们提供信息，并且如果法律允许执法调查以追查和阻止非法活动，我们将提供帮助。这也意味着我们的平台仅适用于守法的客户。
			</div>
			<div class="p">
				我们希望能为您提供服务，同时，我们也希望您在我们的平台上能够依法合法地行事。
			</div>
			<h3>第七条：反洗钱/反恐怖融资方案</h3>
		
			<div class="p">
				通过基于风险的多层次控制系统，我们设计了我们的反洗钱和反恐怖融资方案以合理防止洗钱和恐怖主义融资。
			</div>
			<div class="p">
				该方案的第一层包括严格的用户身份识别程序，包括验证个人和 企业用户的身份。除了获得身份证明文件外，我们还向非自然人用户取得其机构受益所有人/自然人的信息，这是符合国际标准的。
			</div>
			<div class="p">
				第二层包括基于风险的系统控制，以保证额外的客户尽职调查得以执行。我们也可以酌情在其他名单中进行筛选，以保护我们的声誉和客户。
			</div>
			<div class="p">
				第三层包括持续监控可疑活动。如果我们怀疑或有理由怀疑存在可疑交易活动，我们将酌情向当地监管机构提交可疑交易活动报告。通常，可疑交易与客户已知的合法业务或个人日常交易活动不一致。
			</div>
			<div class="p">
				以上是我们合规计划的主要组成部分。然而，这些多层次风控系统的最重要的纽带是我们的领导团队和员工，包括执行培训、监督并形成良好合规文化的反洗钱/风控人员。
			</div>
			<button class="changebton" @click="bool2=false" style="background: #2167ff;">我已阅读并了解</button>
		</van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isclick: true,
      mobile: "",
      password: "",
      trad_password: "",
      trad_passwordc: "",
      code: "",
      invite_code: "",
      nick_name: "",
      passwordc: "",
	  ispass:0,
	  type:'',
	  bool:false,
	  bool2:false
    };
  },
  created() {
    if (this.$route.query.id) {
      this.invite_code = this.$route.query.id;
      this.istogle = 1;
    }
    // if (this.getCookie("logmobile")) {
    //   this.logmobile = this.getCookie("logmobile");
    //   this.logpassword = this.getCookie("logpassword");
    //   this.ispass = true;
    // }
  },
  methods: {
    // 获取验证码
    setcode(e) {
      var ts = this;
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
      let email = this.mobile;
		let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(reg.test(email)){
			// alert("邮箱格式正确");
			ts.type = 2
		}else{
			ts.type = 1
		}
      if (ts.isclick) {
        ts.isclick = false;

        this.$axios
          .post('/index/Publics/send', {
            mobile: this.mobile,
			type:ts.type
          })
          .then(res => {
            if (res.data.code == 0) {
              this.$toast.success({ message: res.data.msg, duration: 1200 });
              var tiem = 60;
              e.target.innerText = tiem + "s";
              var timeover = setInterval(function() {
                tiem -= 1;
                e.target.innerText = tiem + "s";
                if (tiem <= 0) {
                  e.target.innerText = "获取";
                  clearInterval(timeover);
                  ts.isclick = true;
                }
              }, 1000);
            } else {
              this.$toast.fail({ message: res.data.msg, duration: 1200 });
            }
          });
      }
    },
    ismobile(s) {
      var regPhone = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      var patternPhone = new RegExp(regPhone);
      if (patternPhone.test(s)) {
        return true;
      } else {
        return false;
      }
    },
    send() {
		
      if (
        !this.mobile ||
        !this.password ||
        !this.trad_password ||
        !this.trad_passwordc ||
        // !this.code ||
        !this.nick_name ||
        !this.passwordc ||
        !this.invite_code
      ) {
        this.$toast.fail({ message: "请填写完整", duration: 1200 });
        return;
      }
      // if (!this.ismobile(this.mobile))
      //   return this.$toast.fail({
      //     message: "手机号码格式不正确",
      //     duration: 1200
      //   });
      if (this.password != this.passwordc)
        return this.$toast.fail({ message: "两次密码不一致", duration: 1200 });

      if (this.trad_password != this.trad_passwordc)
        return this.$toast.fail({
          message: "两次交易密码不一致",
          duration: 1200
        });
		if(this.ispass == 0){
			this.$toast.fail({
			  message: "请阅读用户协议",
			  duration: 1200
			});
			return
		}
		let email = this.mobile;
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(reg.test(email)){
					// alert("邮箱格式正确");
					this.type = 2
				}else{
					this.type = 1
				}
      this.$axios
        .post("/index/Publics/doRegister", {
          mobile: this.mobile,
          password: this.password,
          trad_password: this.trad_password,
          code: this.code,
          invite_code: this.invite_code,
          nick_name: this.nick_name,
		  type:this.type,
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$toast.success({ message: res.data.msg, duration: 1200 });
            setTimeout(() => {
               this.$router.push("/login");
            }, 1200);
          } else {
            this.$toast.fail({ message: res.data.msg, duration: 1200 });
          }
        });
    }
    // setCookie(name, value) {
    //   var exp = new Date();
    //   exp.setTime(exp.getTime() + 7 * 24 * 60 * 60 * 1000);
    //   document.cookie =
    //     name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    // },
    // getCookie(name) {
    //   var arr,
    //     reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //   if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    //   else return null;
    // }
  },
  watch: {
    // ispass(s) {
    //   console.log(s);
    // }
  }
};
</script>

<style lang="less" scoped>
@import url("../less/login.less");
.headtop {
  text-align: left;
}
.loginul .pass {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  a {
    position: relative;
    top: -0.2rem;
  }
  label {
    width: 40%;
    position: relative;
    color: #3c8cff;
  }
  .text {
    position: relative;
    font-size: 0.26rem;
    top: -0.1rem;
    left: 0.1rem;
  }
  .box {
    border: 1px solid #3c8cff;
    font-size: 0.3rem;
    height: 0.26rem;
    text-align: center;
    line-height: 0.3rem;
    width: 0.26rem;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    top: -0.06rem;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
}
.headtop {
  margin: 0.3rem 0 0.6rem 0.3rem;
}
.pass {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  a {
    position: relative;
    top: -0.29rem;
  }
  label {
    width: 40%;
    position: relative;
    color: rgb(48,108,232);
  }
  .text {
    position: relative;
    font-size: 0.29rem;
    top: -0.1rem;
    left: 0.1rem;
  }
  .box {
    border: 2px solid rgb(48,108,232);
    font-size: 0.3rem;
    height: 10px;
    text-align: center;
    line-height: 10px;
    width: 10px;
    display: inline-block;
    border-radius: 50%;
    position: relative;
    top: -2px;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
  }
}
.poup {
		h2 {
			text-align: center;
			margin: 10px 0;
			color: rgb(0, 27, 49);
			font-size: 18px;
			font-weight: 550;
		}

		h4 {
			margin: 0px 0 5px 0;
			color: rgb(0, 27, 49);
			text-align: center;
			font-size: 16px;
		}

		.p {
			padding: 0 .28rem;
			text-indent: 24px;
			color: rgb(138, 144, 151);
			font-size: 14px;
		}

		.p1 {
			text-indent: 0px;
		}

		h3 {
			margin: 4px 0;
			padding: 0 .28rem;
			font-weight: 550;
			font-size: 16px;
			color: rgb(0, 27, 49);
		}

		h5 {
			color: rgb(138, 144, 151);
			padding: 0 .28rem;
			font-size: 16px;
			margin: 0px 0 2px 0;
		}
		
	}
</style>
