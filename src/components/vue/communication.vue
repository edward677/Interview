<template>
  <div class="communication_warp">
    <el-collapse accordion>
      <el-collapse-item title="1. props  /   $emit">
        <p>父组件通过<code>props</code>向子组件传递数据，子组件通过<code>$emit</code>和父组件通信</p>
        <h5 data-id="heading-48">1. 父组件向子组件传值</h5>
        <ul>
          <li><code>props</code>只能是父组件向子组件进行传值，<code>props</code>使得父子组件之间形成了一个单向下行绑定。子组件的数据会随着父组件不断更新。</li>
          <li><code>props</code> 可以显示定义一个或一个以上的数据，对于接收的数据，可以是各种数据类型，同样也可以传递一个函数。</li>
          <li><code>props</code>属性名规则：若在<code>props</code>中使用驼峰形式，模板中需要使用短横线的形式</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 父组件</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"father"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">son</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"msgData"</span> <span class="hljs-attr">:fn</span>=<span class="hljs-string">"myFunction"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">son</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> son <span class="hljs-keyword">from</span> <span class="hljs-string">"./son.vue"</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: father,
    <span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span> {
        <span class="hljs-attr">msgData</span>: <span class="hljs-string">"父组件数据"</span>;
    },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-function"><span class="hljs-title">myFunction</span>(<span class="hljs-params"></span>)</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"vue"</span>);
        }
    },
    <span class="hljs-attr">components</span>: {
        son
    }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 子组件</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"son"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{{msg}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"fn"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"son"</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">"msg"</span>, <span class="hljs-string">"fn"</span>]
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="2. 子组件向父组件传值">
        <ul>
          <li><code>$emit</code>绑定一个自定义事件，当这个事件被执行的时就会将参数传递给父组件，而父组件通过<code>v-on</code>监听并接收参数。</li>
        </ul>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 父组件</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"section"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">com-article</span> <span class="hljs-attr">:articles</span>=<span class="hljs-string">"articleList"</span> @<span class="hljs-attr">onEmitIndex</span>=<span class="hljs-string">"onEmitIndex"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">com-article</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{{currentIndex}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> comArticle <span class="hljs-keyword">from</span> <span class="hljs-string">'./test/article.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'comArticle'</span>,
  <span class="hljs-attr">components</span>: { comArticle },
  <span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">currentIndex</span>: -<span class="hljs-number">1</span>,
      <span class="hljs-attr">articleList</span>: [<span class="hljs-string">'红楼梦'</span>, <span class="hljs-string">'西游记'</span>, <span class="hljs-string">'三国演义'</span>]
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-function"><span class="hljs-title">onEmitIndex</span>(<span class="hljs-params">idx</span>)</span> {
      <span class="hljs-built_in">this</span>.currentIndex = idx
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">//子组件</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in articles"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"emitIndex(index)"</span>&gt;</span>{{item}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">props</span>: [<span class="hljs-string">'articles'</span>],
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-function"><span class="hljs-title">emitIndex</span>(<span class="hljs-params">index</span>)</span> {
      <span class="hljs-built_in">this</span>.$emit(<span class="hljs-string">'onEmitIndex'</span>, index) <span class="hljs-comment">// 触发父组件的方法，并传递参数index</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
      </el-collapse-item>
      <el-collapse-item title="3. eventBus事件总线（$emit / $on）">
        <p><code>eventBus</code>事件总线适用于<strong>父子组件</strong>、<strong>非父子组件</strong>等之间的通信，使用步骤如下：</p>
        <p><strong>（1）创建事件中心管理组件之间的通信</strong></p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// event-bus.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> EventBus = <span class="hljs-keyword">new</span> Vue()
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（2）发送事件</strong>
          假设我们有两个兄弟组件<code>firstCom</code>和<code>secondCom</code>：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">first-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">first-com</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">second-com</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">second-com</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> firstCom <span class="hljs-keyword">from</span> <span class="hljs-string">'./firstCom.vue'</span>
<span class="hljs-keyword">import</span> secondCom <span class="hljs-keyword">from</span> <span class="hljs-string">'./secondCom.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: { firstCom, secondCom }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在<code>firstCom</code>组件中发送事件：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"add"</span>&gt;</span>加法<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {EventBus} <span class="hljs-keyword">from</span> <span class="hljs-string">'./event-bus.js'</span> <span class="hljs-comment">// 引入事件中心</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">num</span>:<span class="hljs-number">0</span>
    }
  },
  <span class="hljs-attr">methods</span>:{
    <span class="hljs-function"><span class="hljs-title">add</span>(<span class="hljs-params"></span>)</span>{
      EventBus.$emit(<span class="hljs-string">'addition'</span>, {
        <span class="hljs-attr">num</span>:<span class="hljs-built_in">this</span>.num++
      })
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>（3）接收事件</strong></p>
        <p>在<code>secondCom</code>组件中发送事件：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>求和: {{count}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { EventBus } <span class="hljs-keyword">from</span> <span class="hljs-string">'./event-bus.js'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-function"><span class="hljs-title">mounted</span>(<span class="hljs-params"></span>)</span> {
    EventBus.$on(<span class="hljs-string">'addition'</span>, <span class="hljs-function"><span class="hljs-params">param</span> =&gt;</span> {
      <span class="hljs-built_in">this</span>.count = <span class="hljs-built_in">this</span>.count + param.num;
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在上述代码中，这就相当于将<code>num</code>值存贮在了事件总线中，在其他组件中可以直接访问。事件总线就相当于一个桥梁，不用组件通过它来通信。</p>
        <p>虽然看起来比较简单，但是这种方法也有不变之处，如果项目过大，使用这种方式进行通信，后期维护起来会很困难。
          <a name="user-content-17c4f760"></a></p>
      </el-collapse-item>
      <el-collapse-item title="4. 依赖注入（project / inject）">
        <p>这种方式就是Vue中的<strong>依赖注入</strong>，这应该算是Vue高阶的一个知识点吧，正好最近用到了这个依赖注入，那么就来写一下。</p>
        <p>该方法用于<strong>父子组件之间的通信</strong>。当然这里所说的父子不一定是真正的父子，也可以是祖孙组件，在层数很深的情况下，我们可以使用这种方法来进行传值。就不用一层一层的传递了。</p>
        <p><code>project / inject</code>是Vue提供的两个钩子，和<code>data</code>、<code>methods</code>是同级的。并且<code>project</code>的书写形式和<code>data</code>一样。</p>
        <ul>
          <li><code>project</code> 钩子用来发送数据或方法</li>
          <li><code>inject</code>钩子用来接收数据或方法</li>
        </ul>
        <p>在父组件中：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-title">provide</span>(<span class="hljs-params"></span>)</span> {
 <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">num</span>: <span class="hljs-built_in">this</span>.num
  };
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在子组件中：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">inject: [<span class="hljs-string">'num'</span>]
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>我们还可以这样写，这样写就可以访问父组件中的所有属性：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-function"><span class="hljs-title">provide</span>(<span class="hljs-params"></span>)</span> {
 <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">app</span>: <span class="hljs-built_in">this</span>
  };
}
<span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span> {
 <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">num</span>: <span class="hljs-number">1</span>
  };
}

<span class="hljs-attr">inject</span>: [<span class="hljs-string">'app'</span>]
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">this</span>.app.num)
<span class="copy-code-btn">复制代码</span></code></pre>
        <p><strong>注意：</strong> 依赖注入所提供的属性是<strong>非响应式</strong>的。
          <a name="user-content-f5be77e1"></a></p>
      </el-collapse-item>
      <el-collapse-item title="5. ref / refs">
        <p>最近也用到这个方式来进行组件之间的通信，这种方式也是实现<strong>父子组件</strong>之间的通信。下面就来看一下。</p>
        <p><code>ref</code>： 这个属性用在子组件上，它的引用就指向了子组件的实例。可以通过实例来访问组件的数据和方法。</p>
        <p>在子组件中：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'JavaScript'</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    sayHello () {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello'</span>)
    }
  }
}
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在父组件中：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript"><span class="hljs-comment">// 父组件中</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello_world"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{{msg}}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"change"</span>&gt;</span>点击改变子组件值<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> child <span class="hljs-keyword">from</span> <span class="hljs-string">'./child.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: { child },
  <span class="hljs-function"><span class="hljs-title">data</span>(<span class="hljs-params"></span>)</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome'</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-function"><span class="hljs-title">change</span>(<span class="hljs-params"></span>)</span> {
      <span class="hljs-comment">// 获取到子组件</span>
      <span class="hljs-built_in">this</span>.$children[<span class="hljs-number">0</span>].message = <span class="hljs-string">'JavaScript'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在上面的代码中，子组件获取到了父组件的<code>parentVal</code>值，父组件改变了子组件中<code>message</code>的值。</p>
        <p><strong>需要注意：</strong></p>
        <ul>
          <li>通过<code>$parent</code>访问到的是上一级父组件的实例，可以使用<code>$root</code>来访问根组件的实例</li>
          <li>在组件中使用<code>$children</code>拿到的是所有的子组件的实例，它是一个数组，并且是无序的</li>
          <li>在根组件<code>#app</code>上拿<code>$parent</code>得到的是<code>new Vue()</code>的实例，在这实例上再拿<code>$parent</code>得到的是<code>undefined</code>，而在最底层的子组件拿<code>$children</code>是个空数组</li>
          <li><code>$children</code> 的值是<strong>数组</strong>，而<code>$parent</code>是个<strong>对象</strong>
            <a name="user-content-46204e5e"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="6. $attrs / $listeners">
        <p>我们考虑一种场景，如果A是B组件的父组件，B是C组件的父组件。如果我们想要组件A给组件C传递数据，这种隔代的数据，该使用哪种方式呢？</p>
        <p>如果是用<code>props/$emit</code>来一级一级的传递，确实可以完成，但是比较复杂；如果使用事件总线，在多人开发或者项目较大的时候，维护起来很麻烦；如果使用Vuex，的确也可以，但是如果仅仅是传递数据，那可能就有点浪费了。</p>
        <p>针对上述情况，Vue引入了<code>$attrs / $listeners</code>，实现组件之间的跨代通信。</p>
        <p>先来看一下<code>inheritAttrs</code>，它的默认值true，继承所有的父组件属性除<code>props</code>之外的所有属性；<code>inheritAttrs：false</code> 只继承class属性 。</p>
        <ul>
          <li><code>$attrs</code>：继承所有的父组件属性（除了prop传递的属性、class 和 style ），一般用在子组件的子元素上</li>
          <li><code>$listeners</code>：该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 <code>v-on="$listeners"</code> 将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）</li>
        </ul>
        <p>A组件（<code>APP.vue</code>）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        //此处监听了两个事件，可以在B组件或者C组件中直接触发
        <span class="hljs-tag">&lt;<span class="hljs-name">child1</span> <span class="hljs-attr">:p-child1</span>=<span class="hljs-string">"child1"</span> <span class="hljs-attr">:p-child2</span>=<span class="hljs-string">"child2"</span> @<span class="hljs-attr">test1</span>=<span class="hljs-string">"onTest1"</span> @<span class="hljs-attr">test2</span>=<span class="hljs-string">"onTest2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Child1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./Child1.vue'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { Child1 },
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-function"><span class="hljs-title">onTest1</span>(<span class="hljs-params"></span>)</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test1 running'</span>);
        },
        <span class="hljs-function"><span class="hljs-title">onTest2</span>(<span class="hljs-params"></span>)</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'test2 running'</span>);
        }
    }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>B组件（<code>Child1.vue</code>）：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child-1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>props: {{pChild1}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>$attrs: {{$attrs}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">child2</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">"$attrs"</span> <span class="hljs-attr">v-on</span>=<span class="hljs-string">"$listeners"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Child2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./Child2.vue'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'pChild1'</span>],
    <span class="hljs-attr">components</span>: { Child2 },
    <span class="hljs-attr">inheritAttrs</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-function"><span class="hljs-title">mounted</span>(<span class="hljs-params"></span>)</span> {
        <span class="hljs-built_in">this</span>.$emit(<span class="hljs-string">'test1'</span>); <span class="hljs-comment">// 触发APP.vue中的test1方法</span>
    }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>C 组件 (<code>Child2.vue</code>)：</p>
        <pre><code class="hljs language-javascript copyable" lang="javascript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"child-2"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>props: {{pChild2}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>$attrs: {{$attrs}}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;/template&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'pChild2'</span>],
    <span class="hljs-attr">inheritAttrs</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-function"><span class="hljs-title">mounted</span>(<span class="hljs-params"></span>)</span> {
        <span class="hljs-built_in">this</span>.$emit(<span class="hljs-string">'test2'</span>);<span class="hljs-comment">// 触发APP.vue中的test2方法</span>
    }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
<span class="copy-code-btn">复制代码</span></code></pre>
        <p>在上述代码中：</p>
        <ul>
          <li>C组件中能直接触发test的原因在于 B组件调用C组件时 使用 v-on 绑定了<code>$listeners</code> 属性</li>
          <li>在B组件中通过v-bind 绑定<code>$attrs</code>属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的）
            <a name="user-content-yIjci"></a></li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="7. 总结">
        <p><strong>（1）父子组件间通信</strong></p>
        <ul>
          <li>子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。</li>
          <li>通过 ref 属性给子组件设置一个名字。父组件通过 $refs 组件名来获得子组件，子组件通过 $parent 获得父组件，这样也可以实现通信。</li>
          <li>使用 provide/inject，在父组件中通过 provide提供变量，在子组件中通过 inject 来将变量注入到组件中。不论子组件有多深，只要调用了 inject 那么就可以注入 provide中的数据。</li>
        </ul>
        <p><strong>（2）兄弟组件间通信</strong></p>
        <ul>
          <li>使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。</li>
          <li>通过 $parent/$refs 来获取到兄弟组件，也可以进行通信。</li>
        </ul>
        <p><strong>（3）任意组件之间</strong></p>
        <ul>
          <li>使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。</li>
        </ul>
        <p>如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 vuex ，vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的。
          <a name="user-content-Jioc2"></a></p>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
</script>

<style lang="less" scoped>

</style>
